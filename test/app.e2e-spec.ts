import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    //중요: 실제 구동환경과 테스트 환경의 app 동기화 해줘야 함!
    app.useGlobalPipes(new ValidationPipe({
      transform: true,  // @Params, @Query, @Body DTO 등으로 변환시 선언한 타입에 맞게 자동 형변환
      whitelist: true, // DTO 데코레이터 필드만 허용시킴
      forbidNonWhitelisted: true, // DTO 정의되지 않는 필드 보낼시 에러 처리
    }));
    await app.init();
  });
  describe('Home', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('this is nest Movie Api.');
    });
  });

  describe('Movies', () => {
    describe('GET', () => {
      it('GET Movies', () => {
        return request(app.getHttpServer())
          .get('/movies')
          .expect(200)
          .expect([
              { id: 1, title: '해리포터1', author: '조앤아줌마', genre: [] },
              {
                id: 2,
                title: 'Ring of King',
                author: '드래곤',
                rating: 4,
                year: 2010,
                genre: ['SF', '모험'],
              },
            ],
          );
      });
      it('GET Movie By ID', () => {
        return request(app.getHttpServer())
          .get('/movies/1')
          .expect(200)
          .expect({ id: 1, title: '해리포터1', author: '조앤아줌마', genre: [] });
      });
      it('By ID return 404 NotFound', () => {
        return request(app.getHttpServer())
          .get('/movies/9999')
          .expect(404)
          .expect({
              statusCode: 404,
              message: 'movie can\'t find this 9999',
              error: 'Not Found',
            },
          );
      });
      it('Search By id OR title', () => {
        return request(app.getHttpServer())
          .get('/movies/search?title=Ring of King')
          .expect(200)
          .expect([{
              id: 2,
              title: 'Ring of King',
              author: '드래곤',
              rating: 4,
              year: 2010,
              genre: ['SF', '모험'],
            }],
          );
      });
      it('Search By 한글 title', () => {
        const query = encodeURIComponent('해리포터1');
        return request(app.getHttpServer())
          .get(`/movies/search?title=${query}`)
          .expect(200)
          .expect([{ id: 1, title: '해리포터1', author: '조앤아줌마', genre: [] },
            ],
          );
      });
      it('Search By Nothing', () => {
        return request(app.getHttpServer())
          .get(`/movies/search?title=nothing`)
          .expect(200)
          .expect([]);
      });

    });

    describe('POST', () => {
      it('Create Movie', () => {
        const movie = {
          title: 'Create Movie',
          author: 'Crate Author',
          year: 2020,
          rating: 1,
          genre: ['T', 'E', 'S', 'T'],
        };
        return request(app.getHttpServer())
          .post('/movies')
          .send(movie)
          .expect({
            movie: { ...movie, id: 3 },
            created: true,
          });
      });
      it('무비 생성시 허용하지 않는 프로퍼티 차단하기', () => {
        return request(app.getHttpServer())
          .post('/movies')
          .send({
            title: 'Create Movie',
            author: 'Crate Author',
            year: 2020,
            rating: 1,
            hacking: 'Hack ME', // 허용하지 않는 프로퍼티!
          })
          .expect(400);
      });

    });


    describe('DELETE', () => {
      it('return 404 NotFound', () => {
        return request(app.getHttpServer())
          .delete('/movies')
          .expect(404);
      });
      it('Remove Movie By ID', () => {
        return request(app.getHttpServer())
          .delete('/movies/1')
          .expect(200)
          .expect({
            count: 1,
            removed: true,
          });

      });
    });

    describe('PATCH', () => {
      it('Update Movie By ID', () => {
        return request(app.getHttpServer())
          .patch('/movies/1')
          .send({ title: 'Harry Porter1', rating: 5 })
          .expect(200)
          .expect({ id: 1, title: 'Harry Porter1', author: '조앤아줌마', rating:5, genre: [] },
          );
      });
      it('Update Not Found(404)', () => {
        return request(app.getHttpServer())
          .patch('/movies/9999')
          .expect(404)
      })
    });


  });

});
