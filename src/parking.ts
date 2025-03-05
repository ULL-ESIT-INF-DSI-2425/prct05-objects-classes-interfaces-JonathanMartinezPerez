import { Coche, Moto } from "../src/vehiculos";

/**
 * Clase Parking
 * Atributos:
 * - maxCoches: number
 * - maxMotos: number
 * - coches: { vehiculo: Coche, fechaEntrada: Date }[]
 * - motos: { vehiculo: Moto, fechaEntrada: Date }[]
 */
export class Parking {
    private maxCoches: number;
    private maxMotos: number;
    private coches: { vehiculo: Coche, fechaEntrada: Date }[] = [];
    private motos: { vehiculo: Moto, fechaEntrada: Date }[] = [];

    /**
     * Constructor de la clase Parking
     * @param maxCoches 
     * @param maxMotos 
     */
    constructor(maxCoches: number, maxMotos: number) {
        this.maxCoches = maxCoches;
        this.maxMotos = maxMotos;
    }

    /**
     * Método para estacionar un coche
     * @param coche Coche a estacionar
     * @returns true si se ha estacionado, false si no
     */
    public estacionarCoche(coche: Coche): boolean {
        if (this.coches.length < this.maxCoches) {
            this.coches.push({ vehiculo: coche, fechaEntrada: new Date() });
            return true;
        }
        return false;
    }

    /**
     * Método para estacionar una moto
     * @param moto Moto a estacionar
     * @returns true si se ha estacionado, false si no
     */
    public estacionarMoto(moto: Moto): boolean {
        if (this.motos.length < this.maxMotos) {
            this.motos.push({ vehiculo: moto, fechaEntrada: new Date() });
            return true;
        }
        return false;
    }

    /**
     * Método para obtener la fecha de entrada de un coche
     * @param matricula Matrícula del coche
     * @returns Fecha de entrada del coche
     */
    public getfechaEntradaCoche(matricula: string): Date | null {
        const coche = this.coches.find(c => c.vehiculo.getMatricula() === matricula);
        if (coche) return coche.fechaEntrada;
        return null;
    }

    /**
     * Método para obtener la fecha de entrada de una moto
     * @param matricula Matrícula de la moto
     * @returns Fecha de entrada de la moto
     */
    public getfechaEntradaMoto(matricula: string): Date | null {
        const moto = this.motos.find(m => m.vehiculo.getMatricula() === matricula);
        if (moto) return moto.fechaEntrada;
        return null;
    }

    /**
     * Método para retirar un coche
     * @param matricula Matrícula del coche a retirar
     * @returns true si se ha retirado, false si no
     */
    public retirarCoche(matricula: string): boolean {
        const index = this.coches.findIndex(c => c.vehiculo.getMatricula() === matricula);
        if (index !== -1) {
            this.coches.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Método para retirar una moto
     * @param matricula
     * @returns
     */
    public retirarMoto(matricula: string): boolean {
        const index = this.motos.findIndex(m => m.vehiculo.getMatricula() === matricula);
        if (index !== -1) {
            this.motos.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Método para listar los coches
     * @returns Lista de coches
     */
    public listarCoches(): string {
        return this.coches.map(c => c.vehiculo.getData()).join('\n');
    }

    /**
     * Método para listar las motos
     * @returns Lista de motos
     */
    public listarMotos(): string {
        return this.motos.map(m => m.vehiculo.getData()).join('\n');
    }

    /**
     * Metodo para buscar un vehículo por matrícula
     * @param matricula 
     * @returns 
     */
    public buscarVehiculoPorMatricula(matricula: string): string | null {
        const coche = this.coches.find(c => c.vehiculo.getMatricula() === matricula);
        if (coche) return coche.vehiculo.getData();

        const moto = this.motos.find(m => m.vehiculo.getMatricula() === matricula);
        if (moto) return moto.vehiculo.getData();

        return null;
    }

    /**
     * Método para listar los vehículos por marca y modelo
     * @param marca 
     * @param modelo 
     * @returns 
     */
    public listarVehiculosPorMarcaModelo(marca: string, modelo: string): string {
        const coches = this.coches.filter(c => c.vehiculo.getMarca() === marca && c.vehiculo.getModelo() === modelo).map(c => c.vehiculo.getData());
        const motos = this.motos.filter(m => m.vehiculo.getMarca() === marca && m.vehiculo.getModelo() === modelo).map(m => m.vehiculo.getData());
        return [...coches, ...motos].join('\n');
    }

    /**
     * Método para obtener las plazas disponibles de coches
     * @returns Plazas disponibles de coches
     */
    public plazasDisponiblesCoches(): number {
        return this.maxCoches - this.coches.length;
    }

    /**
     * Método para obtener las plazas disponibles de motos
     * @returns Plazas dfisponibles de motos
     */
    public plazasDisponiblesMotos(): number {
        return this.maxMotos - this.motos.length;
    }
}