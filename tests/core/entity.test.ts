import { request } from "../../src/init";
import { ironMan, keel, spiderMan } from "../data";
import { coreRouters } from "./router_data";
import { v4 as uuidv4 } from "uuid";


let timeout = 3000
let successCode = "io.tkeel.SUCCESS"



var newEntityID = uuidv4()


it('CreateEntity', (done) => {
  request
    .post(coreRouters.CreateEntity.path({id:"device123"}))
    .set("authorization", spiderMan.authorization)
    .send({temp: 20})
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode);

      // validate entity.
      let entity = result.data
      expect(entity.id).toBe("device123");
      expect(entity.type).toBe("DEVICE");
      expect(entity.owner).toBe("admin");
      expect(entity.source).toBe("CORE");

      
      // validate entity properties.
      let properties = entity.properties;
      expect(properties.temp).toBe(20);
      done();
    });
}, timeout);


it('UpdateEntity', (done) => {
  request
    .put(coreRouters.UpdateEntity.path("device123"))
    .set("authorization", spiderMan.authorization)
    .send({temp: 30})
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode)

      // validate entity.
      let entity = result.data
      expect(entity.id).toBe("device123")
      expect(entity.type).toBe("DEVICE")
      expect(entity.owner).toBe("admin")
      expect(entity.source).toBe("CORE")

      // validate entity properties.
      let properties = entity.properties
      expect(properties.temp).toBe(30)
      done();
    });
}, timeout);


it('GetEntity', (done) => {
  request
    .get(coreRouters.GetEntity.path("device123"))
    .set("authorization", spiderMan.authorization)
    .send({temp: 30})
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode)

      // validate entity.
      let entity = result.data
      expect(entity.id).toBe("device123")
      expect(entity.type).toBe("DEVICE")
      expect(entity.owner).toBe("admin")
      expect(entity.source).toBe("CORE")

      // validate entity properties.
      let properties = entity.properties
      expect(properties.temp).toBe(30)
      done();
    });
}, timeout);


it('ListEntity', (done) => {
  request
    .post(coreRouters.ListEntity.path())
    .set("authorization", spiderMan.authorization)
    .send({})
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode)
      console.log("list result: ", result)
      done();
    });
}, timeout);


it('UpdateEntityProps', (done) => {
  request
    .put(coreRouters.UpdateEntityProps.path("device123"))
    .set("authorization", spiderMan.authorization)
    .send({
      temp: 50,
    })
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode)

      // validate entity.
      let entity = result.data
      expect(entity.id).toBe("device123")
      expect(entity.type).toBe("DEVICE")
      expect(entity.owner).toBe("admin")
      expect(entity.source).toBe("CORE")

      // validate entity properties.
      let properties = entity.properties
      expect(properties.temp).toBe(50)
      done();
    });
}, timeout);



it('PatchEntityProps', (done) => {
  request
    .put(coreRouters.PatchEntityProps.path("device123"))
    .set("authorization", spiderMan.authorization)
    .send([{
      path: "temp",
      value: 100,
      operator: "replace",
    }])
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode)

      // validate entity.
      let entity = result.data
      expect(entity.id).toBe("device123")
      expect(entity.type).toBe("DEVICE")
      expect(entity.owner).toBe("admin")
      expect(entity.source).toBe("CORE")

      // validate entity properties.
      let properties = entity.properties
      expect(properties.temp).toBe(100)
      done();
    });
}, timeout);



it('GetEntityProps', (done) => {
  request
    .get(coreRouters.GetEntity.path("device123"))
    .set("authorization", spiderMan.authorization)
    .send({temp: 30})
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode)

      // validate entity.
      let entity = result.data
      expect(entity.id).toBe("device123")
      expect(entity.type).toBe("DEVICE")
      expect(entity.owner).toBe("admin")
      expect(entity.source).toBe("CORE")

      // validate entity properties.
      let properties = entity.properties
      expect(properties.temp).toBe(100)
      done();
    });
}, timeout);



it('RemoveEntityProps', (done) => {
  request
    .del(coreRouters.RemoveEntityProps.path("device123", "temp"))
    .set("authorization", spiderMan.authorization)
    .send()
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode)

      // validate entity.
      let entity = result.data
      expect(entity.id).toBe("device123")
      expect(entity.type).toBe("DEVICE")
      expect(entity.owner).toBe("admin")
      expect(entity.source).toBe("CORE")
      console.log("properties: ", result)
      done();
    });
}, timeout);



it('UpdateEntityConfigs', (done) => {
  request
    .put(coreRouters.UpdateEntityConfigs.path("device123"))
    .set("authorization", spiderMan.authorization)
    .send([
      {
        "id": "metrics",
        "type": "struct",
        "define": {
            "fields": {
                "temp":   {
                    "define": {
                        "max": 500,
                        "min": 10,
                        "unit": "°"
                    },
                    "description": "",
                    "enabled": true,
                    "enabled_search": false,
                    "enabled_time_series": false,
                    "id": "temp",
                    "last_time": 0,
                    "type": "int",
                    "weight": 0
                }
            }
        },
        "enabled": true,
        "enabled_search": true
      },
    ])
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode)

      // validate entity.
      let entity = result.data
      expect(entity.id).toBe("device123")
      expect(entity.type).toBe("DEVICE")
      expect(entity.owner).toBe("admin")
      expect(entity.source).toBe("CORE")
      done();
    });
}, timeout);



it('PatchEntityConfigs', (done) => {
  request
    .put(coreRouters.PatchEntityProps.path("device123"))
    .set("authorization", spiderMan.authorization)
    .send([{
      path: "metrics",
      value: 100,
      operator: "remove",
    }])
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode)

      // validate entity.
      let entity = result.data
      expect(entity.id).toBe("device123")
      expect(entity.type).toBe("DEVICE")
      expect(entity.owner).toBe("admin")
      expect(entity.source).toBe("CORE")

      done();
    });
}, timeout);



it('GetEntityConfigs', (done) => {
  request
    .get(coreRouters.GetEntityConfigs.path("device123", "metrics.temp"))
    .set("authorization", spiderMan.authorization)
    .send()
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode)

      // validate entity.
      let entity = result.data
      expect(entity.id).toBe("device123")
      expect(entity.type).toBe("DEVICE")
      expect(entity.owner).toBe("admin")
      expect(entity.source).toBe("CORE")

      console.log(result)
      done();
    });
}, timeout);



it('RemoveEntityConfigs', (done) => {
  request
    .del(coreRouters.RemoveEntityProps.path("device123", "temperture"))
    .set("authorization", spiderMan.authorization)
    .send()
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode)

      // validate entity.
      let entity = result.data
      expect(entity.id).toBe("device123")
      expect(entity.type).toBe("DEVICE")
      expect(entity.owner).toBe("admin")
      expect(entity.source).toBe("CORE")
      done();
    });
}, timeout);


it('AppendMapper', (done) => {
  request
    .post(coreRouters.AppendMapper.path("device123"))
    .set("authorization", spiderMan.authorization)
    .send({
      id: "mapper123",
      name:"mapper123name",
      tql_text: "insert into device123 select device234.temp as temp",
    })
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode)

      console.log("AppendMapper Result: ", result)

      // validate entity.
      let entity = result.data
      expect(entity.entity_id).toBe("device123")
      expect(entity.type).toBe("DEVICE")
      expect(entity.owner).toBe("admin")
      expect(entity.source).toBe("CORE")
      done();
    });
}, timeout);



it('GetMapper', (done) => {
  request
    .get(coreRouters.GetMapper.path("device123", "mapper123"))
    .set("authorization", spiderMan.authorization)
    .send()
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode)

      // validate entity.
      let entity = result.data
      expect(entity.id).toBe("device123")
      expect(entity.type).toBe("DEVICE")
      expect(entity.owner).toBe("admin")
      expect(entity.source).toBe("CORE")
      done();
    });
}, timeout);


it('ListMapper', (done) => {
  request
    .get(coreRouters.ListMapper.path("device123"))
    .set("authorization", spiderMan.authorization)
    .send()
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode)

      // validate entity.
      let entity = result.data
      expect(entity.id).toBe("device123")
      expect(entity.type).toBe("DEVICE")
      expect(entity.owner).toBe("admin")
      expect(entity.source).toBe("CORE")
      done();
    });
}, timeout);




it('RemoveMapper', (done) => {
  request
    .del(coreRouters.RemoveMapper.path("device123", "mapper123"))
    .set("authorization", spiderMan.authorization)
    .send()
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode)

      // validate entity.
      let entity = result.data
      expect(entity.id).toBe("device123")
      expect(entity.type).toBe("DEVICE")
      expect(entity.owner).toBe("admin")
      expect(entity.source).toBe("CORE")
      done();
    });
}, timeout);


it('DeleteEntity', (done) => {
  request
    .del(coreRouters.DeleteEntity.path("device123"))
    .set("authorization", spiderMan.authorization)
    .send({temp: 20})
    .expect(200)
    .then((res) => {
      let result = JSON.parse(res.text);
      expect(result.code).toBe(successCode);
      done();
    });
}, timeout);
