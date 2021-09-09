import {Query} from "./query";

import {
    Predicate,
    And,
    Or,
    Eq,
    Neq,
    Gt,
    Gte,
    Lt,
    Lte,
    In,
    Like,
    iLike
} from "./predicate";
import {Asc, Desc, Order} from "./order";


export class QueryBuilder {
    query: Query

    constructor() {
        this.query = new Query()
    }

    and(): Predicate {
        const p = And()
        this.addPredicate(p)
        return p
    }

    or(): Predicate {
        const p = Or()
        this.addPredicate(p)
        return p
    }

    eq(field: string, value: any): QueryBuilder {
        return this.addPredicate(Eq(field, value))
    }

    neq(field: string, value: any): QueryBuilder {
        return this.addPredicate(Neq(field, value))
    }

    gt(field: string, value: any): QueryBuilder {
        return this.addPredicate(Gt(field, value))
    }

    gte(field: string, value: any): QueryBuilder {
        return this.addPredicate(Gte(field, value))
    }

    lt(field: string, value: any): QueryBuilder {
        return this.addPredicate(Lt(field, value))
    }

    lte(field: string, value: any): QueryBuilder {
        return this.addPredicate(Lte(field, value))
    }

    in(field: string, value: any): QueryBuilder {
        return this.addPredicate(In(field, value))
    }

    like(field: string, value: any): QueryBuilder {
        return this.addPredicate(Like(field, value))
    }

    iLike(field: string, value: any): QueryBuilder {
        return this.addPredicate(iLike(field, value))
    }

    asc(field: string): QueryBuilder {
        return this.addOrder(Asc(field))
    }

    desc(field: string): QueryBuilder {
        return this.addOrder(Desc(field))
    }

    page(page: number, perPage?: number): QueryBuilder {
        this.query.page = page
        this.query.per_page = perPage
        return this
    }

    perPage(perPage: number): QueryBuilder {
        this.query.per_page = perPage
        return this
    }

    relation(rel: string): QueryBuilder {
        this.query.relations.push(rel)
        return this
    }

    uniq(field: string): QueryBuilder {
        this.query.uniq = field
        return this
    }


    addPredicate(p: Predicate): QueryBuilder {
        this.query.filter.push(p)
        return this
    }

    addOrder(o: Order): QueryBuilder {
        this.query.orders.push(o)
        return this
    }

    Build() {
        return JSON.stringify(this.query, null, 2)
    }
}

