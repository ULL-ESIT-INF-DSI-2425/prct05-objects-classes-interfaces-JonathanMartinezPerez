
/**
 * Clase abstracta para vehiculos
 * Se ha decidido que la clase sea abstracta para que no se puedan instanciar objetos de ella
 * y se obligue a crear objetos de las subclases Coche y Moto
 * Atributos:
 * - matricula: string
 * - marca: string
 * - modelo: string
 * - cilindrada: number
 * - potencia: number
 */
abstract class Vehiculo {
    private matricula: string;
    private marca: string;
    private modelo: string;
    private cilindrada: number;
    private potencia: number;

    /**
     * Constructor de la clase Vehiculo
     * @param matricula Matrícula del vehículo
     * @param marca Marca del vehículo
     * @param modelo Modelo del vehículo
     * @param cilindrada Cilindrada del vehículo
     * @param potencia Potencia del vehículo
     */
    constructor(matricula: string, marca: string, modelo: string, cilindrada: number, potencia: number) {
        this.matricula = matricula;
        this.marca = marca;
        this.modelo = modelo;
        this.cilindrada = cilindrada;
        this.potencia = potencia;
    }

    /**
     * Método para obtener la matrícula del vehículo
     * @returns Matrícula del vehículo
     */
    public getMatricula(): string {
        return this.matricula;
    }

    /**
     * Método para establecer la matrícula del vehículo
     * @param matricula Matrícula del vehículo
     */
    public setMatricula(matricula: string): void {
        this.matricula = matricula;
    }
    /**
     * Método para obtener la marca del vehículo
     * @returns Marca del vehículo 
     */
    public getMarca(): string {
        return this.marca;
    }

    /**
     * Método para establecer la marca del vehículo
     * @param marca Marca del vehículo
     */
    public setMarca(marca: string): void {
        this.marca = marca;
    }

    /**
     * Método para obtener el modelo del vehículo
     * @returns modelo del vehículo
     */
    public getModelo(): string {
        return this.modelo;
    }

    /**
     * Método para establecer el modelo del vehículo
     * @param modelo Modelo del vehículo
     */
    public setModelo(modelo: string): void {
        this.modelo = modelo;
    }

    /**
     * Método para obtener la cilindrada del vehículo
     * @returns Cilindrada del vehículo
     */
    public getCilindrada(): number {
        return this.cilindrada;
    }

    /**
     * Método para establecer la cilindrada del vehículo
     * @param cilindrada Cilindrada del vehículo
     */
    public setCilindrada(cilindrada: number): void {
        this.cilindrada = cilindrada;
    }

    /**
     * Método para obtener la potencia del vehículo
     * @returns Potencia del vehículo
     */
    public getPotencia(): number {
        return this.potencia;
    }

    /**
     * Método para establecer la potencia del vehículo
     * @param potencia Potencia del vehículo
     */
    public setPotencia(potencia: number): void {
        this.potencia = potencia;
    }

    /**
     * Método abstracto para obtener los datos del vehículo
     * @returns Datos del vehículo
     */
    public abstract getData(): string;
}

/**
 * Subclase de Vehiculo para coches
 * Atributos:
 * - numeroPuertas: number
 */
export class Coche extends Vehiculo {
    private numeroPuertas: number;

    /**
     * Constructor de la subclase Coche
     * @param matricula 
     * @param marca 
     * @param modelo 
     * @param cilindrada 
     * @param potencia 
     * @param numeroPuertas 
     */
    constructor(matricula: string, marca: string, modelo: string, cilindrada: number, potencia: number, numeroPuertas: number) {
        super(matricula, marca, modelo, cilindrada, potencia);
        this.numeroPuertas = numeroPuertas;
    }

    /**
     * Método para obtener el número de puertas del coche
     * @returns numeroPuertas
     */
    public getNumeroPuertas(): number {
        return this.numeroPuertas;
    }
    /**
     * Método para establecer el número de puertas del coche
     * @param numeroPuertas Número de puertas del coche
     */
    public setNumeroPuertas(numeroPuertas: number): void {
        this.numeroPuertas = numeroPuertas;
    }

    /**
     * Método para obtener los datos del coche
     * @returns String con los datos del coche
     */
    public getData(): string {
        return `Coche: ${this.getMarca()} ${this.getModelo()}, Matrícula: ${this.getMatricula()}, Cilindrada: ${this.getCilindrada()}cc, Potencia: ${this.getPotencia()}CV, Puertas: ${this.getNumeroPuertas()}`;
    }
}

/**
 * Subclase especializada para motos
 * Atributos:
 * - tipoManillar: string
 */
export class Moto extends Vehiculo {
    private tipoManillar: string;
    /**
     * Constructor de la subclase Moto
     * @param matricula 
     * @param marca 
     * @param modelo 
     * @param cilindrada 
     * @param potencia 
     * @param tipoManillar 
     */
    constructor(matricula: string, marca: string, modelo: string, cilindrada: number, potencia: number, tipoManillar: string) {
        super(matricula, marca, modelo, cilindrada, potencia);
        this.tipoManillar = tipoManillar;
    }

    /**
     * Método para obtener el tipo de manillar de la moto
     * @returns tipoManillar
     */
    public getTipoManillar(): string {
        return this.tipoManillar;
    }

    /**
     * Método para establecer el tipo de manillar de la moto
     * @param tipoManillar Tipo de manillar
     */
    public setTipoManillar(tipoManillar: string): void {
        this.tipoManillar = tipoManillar;
    }

    /**
     * Método para obtener los datos de la moto
     * @returns String con los datos de la moto
     */
    public getData(): string {
        return `Moto: ${this.getMarca()} ${this.getModelo()}, Matrícula: ${this.getMatricula()}, Cilindrada: ${this.getCilindrada()}cc, Potencia: ${this.getPotencia()}CV, Manillar: ${this.getTipoManillar()}`;
    }
}