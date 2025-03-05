import { expect, describe, test, beforeEach } from 'vitest';
import { Parking } from '../src/parking';
import { Coche, Moto } from '../src/vehiculos';

let parking: Parking;
let coche1: Coche;
let coche2: Coche;
let coche3: Coche;
let moto1: Moto;
let moto2: Moto;
let moto3: Moto;
beforeEach(() => {
    parking = new Parking(6, 5);
    coche1 = new Coche('1234ABC', 'Seat', 'Ibiza', 1400, 90, 5);
    coche2 = new Coche('5678DEF', 'Ford', 'Focus', 1600, 100, 5);
    coche3 = new Coche('5623DEF', 'Hyundai', 'Coupé', 1500, 120, 4);
    moto1 = new Moto('4321CBA', 'Yamaha', 'XJ6', 600, 78, "Chopper");
    moto2 = new Moto('5678FED', 'Honda', 'CBR', 1000, 120, "Deportivo");
    moto3 = new Moto('5623FED', 'Kawasaki', 'Ninja', 1000, 150, "Deportivo");
});

describe('Parking', () => {
    test('Estacionar un coche1', () => {
        expect(parking.estacionarCoche(coche1)).toBeTruthy();
    });

    test('Estacionar una moto', () => {
        expect(parking.estacionarMoto(moto1)).toBeTruthy();
    });

    test('Retirar un coche1', () => {
        parking.estacionarCoche(coche1);
        expect(parking.retirarCoche(coche1.getMatricula())).toBeTruthy();
    });

    test('Retirar una moto', () => {
        parking.estacionarMoto(moto1);
        expect(parking.retirarMoto(moto1.getMatricula())).toBeTruthy();
    });

    test('Listar coches', () => {
        parking.estacionarCoche(coche1);
        expect(parking.listarCoches()).toBe('Coche: Seat Ibiza, Matrícula: 1234ABC, Cilindrada: 1400cc, Potencia: 90CV, Puertas: 5');
    });

    test('Listar motos', () => {
        parking.estacionarMoto(moto1);
        expect(parking.listarMotos()).toBe('Moto: Yamaha XJ6, Matrícula: 4321CBA, Cilindrada: 600cc, Potencia: 78CV, Manillar: Chopper');
    });

    test('Buscar vehículo por matrícula', () => {
        parking.estacionarCoche(coche1);
        parking.estacionarMoto(moto1);
        expect(parking.buscarVehiculoPorMatricula('1234ABC')).toBe('Coche: Seat Ibiza, Matrícula: 1234ABC, Cilindrada: 1400cc, Potencia: 90CV, Puertas: 5');
        expect(parking.buscarVehiculoPorMatricula('4321CBA')).toBe('Moto: Yamaha XJ6, Matrícula: 4321CBA, Cilindrada: 600cc, Potencia: 78CV, Manillar: Chopper');
    });
});

describe('Parking - Estacionar, retirar, listar, y plazas disponibles', () => {
    test('Estacionar un coche', () => {
        expect(parking.estacionarCoche(coche1)).toBeTruthy();
    });

    test('Estacionar una moto', () => {
        expect(parking.estacionarMoto(moto1)).toBeTruthy();
    });

    test('Retirar un coche', () => {
        parking.estacionarCoche(coche1);
        expect(parking.retirarCoche(coche1.getMatricula())).toBeTruthy();
    });

    test('Retirar una moto', () => {
        parking.estacionarMoto(moto1);
        expect(parking.retirarMoto(moto1.getMatricula())).toBeTruthy();
    });

    test('Listar coches', () => {
        parking.estacionarCoche(coche1);
        parking.estacionarMoto(moto1);
        parking.estacionarCoche(coche2);
        parking.estacionarMoto(moto2);
        parking.estacionarCoche(coche3);
        parking.estacionarMoto(moto3);
        expect(parking.listarCoches()).toBe('Coche: Seat Ibiza, Matrícula: 1234ABC, Cilindrada: 1400cc, Potencia: 90CV, Puertas: 5\n'+
            'Coche: Ford Focus, Matrícula: 5678DEF, Cilindrada: 1600cc, Potencia: 100CV, Puertas: 5\n'+
            'Coche: Hyundai Coupé, Matrícula: 5623DEF, Cilindrada: 1500cc, Potencia: 120CV, Puertas: 4');
        expect(parking.listarMotos()).toBe('Moto: Yamaha XJ6, Matrícula: 4321CBA, Cilindrada: 600cc, Potencia: 78CV, Manillar: Chopper\n'+
            'Moto: Honda CBR, Matrícula: 5678FED, Cilindrada: 1000cc, Potencia: 120CV, Manillar: Deportivo\n'+
            'Moto: Kawasaki Ninja, Matrícula: 5623FED, Cilindrada: 1000cc, Potencia: 150CV, Manillar: Deportivo');

        expect(parking.plazasDisponiblesCoches()).toBe(3);
        expect(parking.plazasDisponiblesMotos()).toBe(2);
        parking.retirarCoche(coche1.getMatricula());
        parking.retirarMoto(moto1.getMatricula());
        expect(parking.plazasDisponiblesCoches()).toBe(4);
        expect(parking.plazasDisponiblesMotos()).toBe(3);
        expect(parking.listarVehiculosPorMarcaModelo('Seat', 'Ibiza')).toBe('');
        expect(parking.listarVehiculosPorMarcaModelo('Hyundai', 'Coupé')).toBe('Coche: Hyundai Coupé, Matrícula: 5623DEF, Cilindrada: 1500cc, Potencia: 120CV, Puertas: 4');
        expect(parking.getfechaEntradaCoche('5678DEF')).toBeInstanceOf(Date);
        expect(parking.getfechaEntradaMoto('5678FED')).toBeInstanceOf(Date);
    });
});