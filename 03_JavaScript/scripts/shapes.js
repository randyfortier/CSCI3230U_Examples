class Shape {
    constructor(name) {
        this.name = name;
    }

    toString() {
        return this.name;
    }
}

export class Sphere extends Shape {
    constructor(radius) {
        super('Sphere');
        this.radius = radius;
    }

    get area() {
        return 3.1415926 * this.radius * this.radius;
    }
}

export class Box extends Shape {
    constructor(length, width, height) {
        super('Box');
        this.length = length;
        this.width = width;
        this.height = height;
    }

    get area() {
        return this.length * this.width * this.height;
    }
}