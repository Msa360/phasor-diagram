/**
 * A class representing a phasor - a complex number used in electrical engineering and signal processing.
 * It stores the magnitude and angle (in radians) internally and provides methods to work with both
 * polar and rectangular (Cartesian) coordinates.
 * 
 * @remarks
 * The phasor is stored in polar form (magnitude and angle) but provides convenient access
 * to its rectangular form (real and imaginary parts) through getters.
 * 
 * @example
 * ```typescript
 * const phasor = new Phasor(5, Math.PI/4, 'V1');  // 5∠45° volts
 * console.log(phasor.real);      // ~3.535 (5*cos(45°))
 * console.log(phasor.imaginary); // ~3.535 (5*sin(45°))
 * ```
 */
export class Phasor {
    private _label: string;
    private _magnitude: number;
    private _angle: number; // in radians

    constructor(magnitude: number = 0, angle: number = 0, label: string = '') {
        this._label = label;
        this._magnitude = magnitude;
        this._angle = angle;
    }

    // Getters and setters
    get label(): string {
        return this._label;
    }

    get magnitude(): number {
        return this._magnitude;
    }

    /**
     * The angle of the phasor in radians
     */
    get angle(): number {
        return this._angle;
    }

    get angleDegrees(): number {
        return this._angle * (180 / Math.PI);
    }

    get real(): number {
        return this._magnitude * Math.cos(this._angle);
    }

    get imaginary(): number {
        return this._magnitude * Math.sin(this._angle);
    }

    // Basic operations
    add(other: Phasor): Phasor {
        const real = this.real + other.real;
        const imag = this.imaginary + other.imaginary;
        return Phasor.fromCartesian(real, imag, this._label + ' + ' + other._label);
    }

    multiply(other: Phasor): Phasor {
        return new Phasor(
            this._magnitude * other._magnitude,
            this._angle + other._angle,
            this._label + ' * ' + other._label
        );
    }

    /**
     * Creates a Phasor from Cartesian coordinates (real and imaginary parts)
     * @param real - The real component of the complex number
     * @param imaginary - The imaginary component of the complex number 
     * @param label - Optional label for the phasor
     * @returns A new Phasor instance with equivalent polar coordinates
     */
    static fromCartesian(real: number, imaginary: number, label: string = ''): Phasor {
        const magnitude = Math.sqrt(real * real + imaginary * imaginary);
        const angle = Math.atan2(imaginary, real);
        return new Phasor(magnitude, angle, label);
    }

    /**
     * Creates a new Phasor from a magnitude and angle in degrees
     * @param magnitude - The magnitude (length) of the phasor
     * @param angleDegrees - The angle in degrees
     * @param label - Optional label for the phasor
     * @returns A new Phasor instance with the specified magnitude and angle converted to radians
     */
    static fromDegrees(magnitude: number, angleDegrees: number, label: string = ''): Phasor {
        return new Phasor(magnitude, angleDegrees * (Math.PI / 180), label);
    }
}