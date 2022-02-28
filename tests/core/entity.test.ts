import { request } from "../../src/init";
import { ironMan, keel } from "../data";
import { coreRouters } from "./router_data";


it('CreateEntity', (done) => {
  request
    .post(coreRouters.CreateEntity.path({id:"device123"}))
    .set("authorization", ironMan.authorization)
    .send({temp: 20})
    .expect(200)
    .then((res) => {
      console.log(res.text)
      done();
    });
});

it('ListEntity', (done) => {
    request
      .post(`/apis/core/v1/entities/search`)
      .set("authorization", ironMan.authorization)
      .send({
        query: "device",
        page: {
            limit: 20,
        },
      })
      .expect(200)
      .then((res) => {
        let result = JSON.parse(res.text);
        expect(result.limit).toBe(20);
        done();
      });
  });