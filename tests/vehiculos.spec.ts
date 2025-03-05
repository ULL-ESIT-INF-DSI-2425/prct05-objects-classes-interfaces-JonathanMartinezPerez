import { describe, expect, test, vi } from "vitest";
import { Coche, Moto } from "../src/vehiculos";

describe("Las clases deben funcionar correctamente", () => {
    test("Coche", () => {
        const coche = new Coche("1234ABC", "Ford", "Focus", 2000, 150, 5);
        expect(coche.getData()).toBe("Coche: Ford Focus, Matrícula: 1234ABC, Cilindrada: 2000cc, Potencia: 150CV, Puertas: 5");
    });
    
    test("Moto", () => {
        const moto = new Moto("5678DEF", "Yamaha", "Fazer", 600, 100, "Chopper");
        expect(moto.getData()).toBe("Moto: Yamaha Fazer, Matrícula: 5678DEF, Cilindrada: 600cc, Potencia: 100CV, Manillar: Chopper");
    });
});

describe("Setters y getters", () => {
    test("Coche", () => {
        const coche = new Coche("1234ABC", "Ford", "Focus", 2000, 150, 5);
        coche.setNumeroPuertas(3);
        expect(coche.getNumeroPuertas()).toBe(3);
        coche.setPotencia(200);
        expect(coche.getPotencia()).toBe(200);
        coche.setMarca("Renault");
        expect(coche.getMarca()).toBe("Renault");
        coche.setMatricula("9999ZZZ");
        expect(coche.getMatricula()).toBe("9999ZZZ");
    });
    
    test("Moto", () => {
        const moto = new Moto("5678DEF", "Yamaha", "Fazer", 600, 100, "Chopper");
        moto.setTipoManillar("Deportivo");
        expect(moto.getTipoManillar()).toBe("Deportivo");
        moto.setPotencia(120);
        expect(moto.getPotencia()).toBe(120);
        moto.setCilindrada(800);
        expect(moto.getCilindrada()).toBe(800);
    });
});