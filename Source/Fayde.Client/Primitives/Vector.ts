module Vector {
    var EPSILON = 1e-10;

    export function create(x: number, y: number): number[] {
        return [x, y];
    }

    export function reverse(v: number[]) {
        v[0] = -v[0];
        v[1] = -v[1];
        return v;
    }

    /// Equivalent of rotating 90 degrees clockwise (screen space)
    export function orthogonal(v: number[]) {
        var x = v[0],
            y = v[1];
        v[0] = -y;
        v[1] = x;
        return v;
    }

    export function normalize(v: number[]) {
        var x = v[0],
            y = v[1];
        var len = Math.sqrt(x * x + y * y);
        v[0] = x / len;
        v[1] = y / len;
        return v;
    }

    /// Rotates a vector(v) by angle(theta) clockwise(screen space) ...which is counter-clockwise in coordinate space
    export function rotate(v: number[], theta: number) {
        var c = Math.cos(theta);
        var s = Math.sin(theta);
        var x = v[0];
        var y = v[1];
        v[0] = x * c - y * s;
        v[1] = x * s + y * c;
        return v;
    }



    /// Returns smallest angle (in radians) between 2 vectors
    export function angleBetween(u: number[], v: number[]): number {
        var ux = u[0],
            uy = u[1],
            vx = v[0],
            vy = v[1];
        var num = ux * vx + uy * vy;
        var den = Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);
        return Math.acos(num / den);
    }

    /// By rotating from vector(v1) to vector(v2), tests whether that angle is clockwise (screen space)
    export function isClockwiseTo(v1: number[], v2: number[], theta: number) {
        var nv1 = normalize(v1.slice(0));
        var nv2 = normalize(v2.slice(0));
        rotate(nv1, theta);
        var nx = Math.abs(nv1[0] - nv2[0]);
        var ny = Math.abs(nv1[1] - nv2[1]);
        return nx < EPSILON
            && ny < EPSILON;
    }
}