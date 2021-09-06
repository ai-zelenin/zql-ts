import {Operations} from "./syntax";

export class Predicate {
    field: string
    op: Operations
    value: any

    constructor(op: Operations, field: string, value: any) {
        this.op = op
        this.field = field
        this.value = value
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

    eq(field: string, value: any): Predicate {
        return this.addPredicate(Eq(field, value))
    }

    neq(field: string, value: any): Predicate {
        return this.addPredicate(Neq(field, value))
    }

    gt(field: string, value: any): Predicate {
        return this.addPredicate(Gt(field, value))
    }

    gte(field: string, value: any): Predicate {
        return this.addPredicate(Gte(field, value))
    }

    lt(field: string, value: any): Predicate {
        return this.addPredicate(Lt(field, value))
    }

    lte(field: string, value: any): Predicate {
        return this.addPredicate(Lte(field, value))
    }

    in(field: string, value: any): Predicate {
        return this.addPredicate(In(field, value))
    }

    like(field: string, value: any): Predicate {
        return this.addPredicate(Like(field, value))
    }

    iLike(field: string, value: any): Predicate {
        return this.addPredicate(iLike(field, value))
    }

    addPredicate(p: Predicate): Predicate {
        if (!this.isGroupOp()) {
            throw "can not add this predicate type"
        }
        this.value.push(p)
        return this
    }

    isGroupOp(): boolean {
        return this.op === Operations.OR || this.op === Operations.AND
    }
}

export function And(): Predicate {
    return new Predicate(Operations.AND, "", [])
}

export function Or(): Predicate {
    return new Predicate(Operations.OR, "", [])
}

export function Eq(field: string, value: any): Predicate {
    return new Predicate(Operations.EQ, field, value)
}

export function Neq(field: string, value: any): Predicate {
    return new Predicate(Operations.NEQ, field, value)
}

export function Gt(field: string, value: any): Predicate {
    return new Predicate(Operations.GT, field, value)
}

export function Gte(field: string, value: any): Predicate {
    return new Predicate(Operations.GTE, field, value)
}

export function Lt(field: string, value: any): Predicate {
    return new Predicate(Operations.LT, field, value)
}

export function Lte(field: string, value: any): Predicate {
    return new Predicate(Operations.LTE, field, value)
}

export function In(field: string, value: any): Predicate {
    return new Predicate(Operations.IN, field, value)
}

export function Like(field: string, value: any): Predicate {
    return new Predicate(Operations.LIKE, field, value)
}

export function iLike(field: string, value: any): Predicate {
    return new Predicate(Operations.ILIKE, field, value)
}