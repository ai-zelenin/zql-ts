# ZQL

#### Usage example

```ts
const qb = new QueryBuilder();

qb.eq("sex", "male")

const or = qb.or()
or.like("name", "%lu%")
or.eq("status", 3)

const and = or.and()
and.gt("age", 18)
and.lt("age", 60)


qb.page(10, 50)

qb.asc("id").desc("created_at")

console.log(qb.Build())
```

```json
{
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
  "relations": [],
  "page": 10,
  "per_page": 50
}

```