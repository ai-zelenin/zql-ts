import {Query} from "./query";

import {And, Eq, Gt, Gte, iLike, In, Like, Lt, Lte, Neq, Or, Overlap, Predicate,} from './predicate';
import {Asc, Desc, NullSortType, Order} from "./order";


export class QueryBuilder {
    query: Query
    relMap: Map<string, QueryBuilder>

    constructor() {
        this.query = new Query()
        this.relMap = new Map<string, QueryBuilder>()
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

    overlap(field: string, value: any): QueryBuilder {
        return this.addPredicate(Overlap(field, value))
    }

    asc(field: string, nullSort?: NullSortType): QueryBuilder {
        return this.addOrder(Asc(field, nullSort))
    }

    desc(field: string, nullSort?: NullSortType): QueryBuilder {
        return this.addOrder(Desc(field, nullSort))
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

    // Return new query builder
    relation(rel: string): QueryBuilder {
        const qb = new QueryBuilder()
        this.relMap.set(rel, qb)
        return qb
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

    BuildQuery(): any {
        const q = {}
        if (this.query.filter.length > 0) {
            q["filter"] = this.query.filter
        }

        if (this.query.orders.length > 0) {
            q["orders"] = this.query.orders
        }

        if (this.relMap.size > 0) {
            q["relations"] = {}
        }

        if (this.query.page > 0) {
            q["page"] = this.query.page
        }

        if (this.query.per_page > 0) {
            q["per_page"] = this.query.per_page
        }

        if (this.query.uniq) {
            q["uniq"] = this.query.uniq
        }

        this.relMap.forEach((val, key) => {
            q["relations"][key] = val.BuildQuery()
        })
        return q
    }

    Build(): string {
        return JSON.stringify(this.BuildQuery(), null, 2)
    }
}

