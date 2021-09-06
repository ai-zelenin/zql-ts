# ZQL

```ts
const qb = new QueryBuilder();

qb.eq("id", 17)
qb.like("name", "%fuck%")

const or = qb.or()
or.gt("age", 18)
or.lt("age", 60)

const and = or.and()
and.eq("name", "fuck")
and.eq("age", 33)

qb.page(10, 50)

qb.asc("id").desc("created_at")

console.log(qb.Build())
```

```json
{
  "filter": [
    {
      "op": "eq",
      "field": "id",
      "value": 17
    },
    {
      "op": "like",
      "field": "name",
      "value": "%fuck%"
    },
    {
      "op": "or",
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
        },
        {
          "op": "and",
          "field": "",
          "value": [
            {
              "op": "eq",
              "field": "name",
              "value": "fuck"
            },
            {
              "op": "eq",
              "field": "age",
              "value": 33
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
  "relations": [],
  "page": 10,
  "per_page": 50
}

```