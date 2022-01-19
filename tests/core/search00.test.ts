import { request } from "../../src/init";
import { ironMan, keel } from "../data";

export const listRequest01 = {
    query: "device",
    page: {
        limit: 20,
    },
};

it('entity list', (done) => {
    request
      .post(`/apis/core/v1/entities/search`)
      .set("authorization", ironMan.authorization)
      .send(listRequest01)
      .expect(200)
      .then((res) => {
        let result = JSON.parse(res.text);
        expect(result.limit).toBe(listRequest01.page.limit);
        done();
      });
  });