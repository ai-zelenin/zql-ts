export enum Directions {
    ASC = "asc",
    DESC = "desc",
}

export enum NullSortType {
    NullsFirst = "first",
    NullsLast = "last",
}

export class Order {
    field: string
    direction: Directions
    null_sort_type: NullSortType

    constructor(field: string, dir: Directions, nullSort?: NullSortType) {
        this.field = field
        this.direction = dir
        this.null_sort_type = nullSort
    }
}

export function Asc(field: string, nullSort?: NullSortType): Order {
    return new Order(field, Directions.ASC, nullSort)
}

export function Desc(field: string, nullSort?: NullSortType): Order {
    return new Order(field, Directions.DESC, nullSort)
}