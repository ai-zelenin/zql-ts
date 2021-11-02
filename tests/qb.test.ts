import {QueryBuilder} from "../src";

const validQuery = `{
  "filter": [
    {
      "op": "eq",
      "field": "sex",
      "value": "male"
    },
    {
      "op": "or",
      "field": "",
      "value": [
        {
          "op": "like",
          "field": "name",
          "value": "%lu%"
        },
        {
          "op": "eq",
          "field": "status",
          "value": 3
        },
        {
          "op": "and",
          "field": "",
          "value": [
            {
              "op": "gt",
              "field": "age",
              "value": 18
            },
            {
              "op": "lt",
              "field": "age",
              "value": 60
            }
          ]
        }
      ]
    }
  ],
  "orders": [
    {
      "field": "id",
      "direction": "asc"
    },
    {
      "field": "created_at",
      "direction": "desc"
    }
  ],
  "relations": {
    "feature": {
      "filter": [
        {
          "op": "eq",
          "field": "status",
          "value": 4
        },
        {
          "op": "gt",
          "field": "created_at",
          "value": "2021-11-02T09:37:32.771Z"
        }
      ]
    }
  },
  "page": 10,
  "per_page": 50
}`
test('basic', () => {
    const qb = new QueryBuilder();
    qb.eq("sex", "male")
    const or = qb.or()
    or.like("name", "%lu%")
    or.eq("status", 3)
    const and = or.and()
    and.gt("age", 18)
    and.lt("age", 60)
    qb.relation("feature").eq("status", 4).gt("created_at", new Date("2021-11-02T09:37:32.771Z"))
    qb.page(10, 50)
    qb.asc("id").desc("created_at")
    const queryString = qb.Build()
    console.log(queryString)
    expect(queryString).toEqual(validQuery)
});
