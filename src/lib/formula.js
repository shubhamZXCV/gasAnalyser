function f_mq9(T, H) {
    // Coefficients from regression for MQ9
    const a = 1.2636396581018856;
    const b1 = -0.015411273502357305;
    const b2 = 0.0001423447717815803;
    const b3 = -2.667160028389554e-7;
    const b4 = -3.147248816276855e-5;
    const b5 = 3.5955470516473796e-5;
    return a + b1 * T + b2 * (T ** 2) + b3 * H + b4 * (H ** 2) + b5 * T * H;
}

function getRatio_mq9(ppm) {
    return 23.743 * (ppm ** -0.461);
}

function formula_mq9(H, T, Rs_mq9, Ro_mq9 = 2962.049073305054) {
    return (963.40351 * (Rs_mq9 / Ro_mq9) ** -2.16919739696) * (f_mq9(20, 65) / f_mq9(T, H)) ** -2.16919739696;
}

// MQ7 functions
function f_mq7(T, H) {
    // Coefficients from regression for MQ7
    const a = 1.2094342542500245;
    const b1 = -0.01094546624860255;
    const b2 = 8.559231727624334e-5;
    const b3 = -2.220918787838429e-7;
    const b4 = -2.6206841578149175e-5;
    const b5 = 1.4963577356169694e-5;
    return a + b1 * T + b2 * (T ** 2) + b3 * H + b4 * (H ** 2) + b5 * T * H;
}

function getRatio_mq7(ppm) {
    const a = 22.679;
    const b = -0.676;
    return a * (ppm ** b);
}

function formula_mq7(H, T, Rs, Ro = 2962.049073305054) {
    return (101.24201 * (Rs / Ro) ** -1.4792899) * (f_mq7(20, 65) / f_mq7(T, H)) ** -1.4792899;
}

// MQ136 functions
function f_mq136(T, H) {
    // Coefficients from regression for MQ136
    const a = 1.8049213062479526;
    const b1 = -0.01676578961983332;
    const b2 = 2.2683055653041216e-5;
    const b3 = -0.008472631405786416;
    const b4 = 8.707501494816326e-6;
    const b5 = 6.712560534401002e-5;
    return a + b1 * T + b2 * (T ** 2) + b3 * H + b4 * (H ** 2) + b5 * T * H;
}

function getRatio_mq136(ppm) {
    return 0.585 * (ppm ** -0.267);
}

function formula_mq136(H, T, Rs_mq136, Ro_mq136 = 2962.049073305054) {
    return (0.1342531 * (Rs_mq136 / Ro_mq136) ** -3.74531835206) * (f_mq136(20, 65) / f_mq136(T, H)) ** -3.74531835206;
}

export function calculate_Ro_mq9(Rs_mq9, ppm, T, H) {
  
    const experimentVal_mq9 = getRatio_mq9(ppm) * f_mq9(T, H) / f_mq9(20, 65);
    const calculatedRo_mq9 = Rs_mq9 / experimentVal_mq9;
    return calculatedRo_mq9;
}

export function calculate_Ro_mq7(Rs_mq7, ppm, T, H) {
   
    const experimentVal_mq7 = getRatio_mq7(ppm) * f_mq7(T, H) / f_mq7(20, 65);
    const calculatedRo_mq7 = Rs_mq7 / experimentVal_mq7;
    return calculatedRo_mq7;
}

export function calculate_Ro_mq136(Rs_mq136, ppm, T, H) {
   
    const experimentVal_mq136 = getRatio_mq136(ppm) * f_mq136(T, H) / f_mq136(20, 65);
    const calculatedRo_mq136 = Rs_mq136 / experimentVal_mq136;
    return calculatedRo_mq136;
}
