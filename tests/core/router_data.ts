import { formatDiagnostic } from "@tsd/typescript"

const typeStr = "DEVICE"
const ownerStr = "admin"
const sourceStr = "CORE"
const prefix:string = "/apis/core/v1"


function buildQuery(queries:object):string {
    var queryString = "?type=" + typeStr + "&owner=" + ownerStr + "&source=" + sourceStr
    for (var key in queries) {
        if ("" != queries[key]) {
            queryString = queryString + "&" + key + "=" + queries[key]
        }
    }
    return queryString
}

export const coreRouters = {
    "CreateEntity": {
        "method": "post",
        "path": function(queries:object):string{
            var pathString = prefix + "/entities"
            pathString = pathString + buildQuery(queries)
            return pathString
        },
    },
    "UpdateEntity": {
        "method": "put",
        "path": function(id:string): string {
            var pathString = prefix + "/entities/" + id
            return pathString + buildQuery({})
        },
    },
    "GetEntity": {
        "method": "get",
        "path": function(id:string) {return prefix + "/entities/" + id + buildQuery({})},
    },
    "ListEntity": {
        "method": "post",
        "path": function() {return prefix + "/entities/search" + buildQuery({})},
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
        "path": function(id:string) {
            var pathString = prefix + "/entities/" + id + "/configs" 
            return pathString + buildQuery({})
        },
    },
    "PatchEntityConfigs": {
        "method": "put",
        "path": function(id:string) {
            var pathString = prefix + "/entities/" + id + "/configs/patch"
            return pathString + buildQuery({})
        },
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
        "path": function(eid:string){
            var pathString = prefix + "/entities/" + eid + "/mappers" 
            return pathString + buildQuery({})
        },
    },
    "GetMapper": {
        "method": "get",
        "path": function(eid:string, id:string) {
            var pathString = prefix + "/entities/" + eid + "/mappers/" + id
            console.log("GetMapper: ", pathString)
            return pathString + buildQuery({})
        },
    },
    "ListMapper": {
        "method": "get",
        "path": function(eid:string) {
            var pathString = prefix + "/entities/" + eid + "/mappers"
            return pathString + buildQuery({})
        },
    },
    "RemoveMapper": {
        "method": "delete",
        "path": function(eid:string, id:string) {
            var pathString = prefix + "/entities/" + eid + "/mappers/"
            return pathString + buildQuery({"id": id})
        },
    },
}