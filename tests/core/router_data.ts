
const queryBasic = "?type=DEVICE&owner=admin&source=CORE"
const prefix:string = "/apis/core/v1"


function buildQuery(querys:object):string {
    var queryString = queryBasic
    for (var key in querys) {
        if ("" != querys[key]) {
            queryString = "&" + queryString
        }
    }
    return queryString
}

export const coreRouters = {
    "CreateEntity": {
        "method": "post",
        "path": function(queries:object):string{
            var pathString = prefix + "/entities?"
            return pathString + buildQuery(queries)
        },
    },
    "UpdateEntity": {
        "method": "put",
        "path": function(id:string) {return prefix + "/entities/" + id + buildQuery({})},
    },
    "GetEntity": {
        "method": "get",
        "path": function(id:string) {return prefix + "/entities/" + id + buildQuery({})},
    },
    "ListEntity": {
        "method": "get",
        "path": function() {return prefix + "/entities" + buildQuery({})},
    },
    "DeleteEntity": {
        "method": "delete",
        "path": function(id:string) {return prefix + "/entities/" + id + buildQuery({})},
    },
    "UpdateEntityProps": {
        "method": "put",
        "path": function(id:string) {return prefix + "/entities/" + id + buildQuery({})},
    },
    "PatchEntityProps": {
        "method": "put",
        "path": function(id:string) {return prefix + "/entities/" + id + "/patch" + buildQuery({})},
    },
    "GetEntityProps": {
        "method": "get",
        "path": function(id:string, propertyKeys:string) {
            var pathString = prefix + "/entities/" + id + "/properties"
            var queries = {"property_keys": propertyKeys}
            return pathString + buildQuery(queries)
        },
    },
    "RemoveEntityProps": {
        "method": "delete",
        "path": function(id:string, propertyKeys:string) {
            var pathString = prefix + "/entities/" + id + "/properties" 
            var queries = {"property_keys": propertyKeys}
            return pathString + buildQuery(queries)
        },
    },
    "UpdateEntityConfigs": {
        "method": "put",
        "path": function(id:string) {return prefix + "/entities/" + id + "/configs" + buildQuery({})},
    },
    "PatchEntityConfigs": {
        "method": "put",
        "path": function(id:string) {return prefix + "/entities/" + id + "/configs/patch" + buildQuery({})},
    },
    "GetEntityConfigs": {
        "method": "get",
        "path": function(id:string, propertyKeys:string) {
            var pathString = prefix + "/entities/" + id + "/configs"
            var queries = {"property_keys": propertyKeys}
            return pathString + buildQuery(queries)
        },
    },
    "RemoveEntityConfigs": {
        "method": "delete",
        "path": function(id:string, propertyKeys:string) {
            var pathString = prefix + "/entities/" + id + "/configs"
            var queries = {"property_keys": propertyKeys}
            return pathString + buildQuery(queries)
        },
    },
    "AppendMapper": {
        "method": "post",
        "path": function(eid:string){return prefix + "/entities/" + eid + "/mappers"},
    },
    "GetMapper": {
        "method": "get",
        "path": function(eid:string, id:string) {return prefix + "/entities/" + eid + "/mappers/" + id},
    },
    "ListMapper": {
        "method": "get",
        "path": function(eid:string) {return prefix + "/entities/" + eid + "/mappers"},
    },
    "RemoveMapper": {
        "method": "delete",
        "path": function(eid:string, id:string) {
            return prefix + "/entities/" + eid + "/mappers/" + id
        },
    },
}