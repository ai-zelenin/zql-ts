export enum Directions {
    ASC = "asc",
    DESC = "desc",
}

export class Order {
    field: string
    direction: Directions

    constructor(field: string, dir: Directions) {
        this.field = field
        this.direction = dir
    }
}

export function Asc(field: string): Order {
    return new Order(field, Directions.ASC)
}

export function Desc(field: string): Order {
    return new Order(field, Directions.DESC)
}