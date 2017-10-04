import { combineReducers } from 'redux';

import {
  FETCH_PROCESSES_FROM_DB,
} from '../actions/index';


function allProcesses(state=[], action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_PROCESSES_FROM_DB: return payload.allProcesses;
    default: return state;
  }
}


const processesReducer = combineReducers({
  allProcesses,
});

export default processesReducer;

/*
processes : {
  allProcesses : [
    "AKA",
    "PLA",
    "LRA",
    "WRA",
    "KG",
    "PLAP",
    "PLAT",
    "SVA",
    "P",
    "P1",
    "PA",
    "GP",
    "H",
    "V",
    "V1",
    "V2",
    "VP",
    "VP1",
    "GPP2",
    "KST",
    "SZ",
    "SBO",
    "AK",
    "PL",
    "RR",
    "SV",
    "SV1",
    "SV2",
    "SVR",
    "SVR1",
    "SK",
    "SK1",
    "SK2",
    "SKK",
    "SKP",
    "SKL",
    "RT",
    "UT",
    "MT",
    "PT",
    "PMI",
    "IP",
    "IG",
    "OTK",
    "FAT",
    "BLS",
    "KOM",
    "UPK",
    "GF",
    "VF",
    "T",
    "T1",
    "T2",
    "T3",
    "R",
    "R1",
    "R2",
    "AO",
    "OK",
    "MS",
    "TR",
    "PS",
    "M",
    "MG",
  ],

  allIds: [
    "AKA",
    "PLA",
    "LRA",
    "WRA",
    "KG",
    "PLAP",
    "PLAT",
    "SVA",
    "P",
    "P1",
    "PA",
    "GP",
    "H",
    "V",
    "V1",
    "V2",
    "VP",
    "VP1",
    "GPP2",
    "KST",
    "SZ",
    "SBO",
    "AK",
    "PL",
    "RR",
    "SV",
    "SV1",
    "SV2",
    "SVR",
    "SVR1",
    "SK",
    "SK1",
    "SK2",
    "SKK",
    "SKP",
    "SKL",
    "RT",
    "UT",
    "MT",
    "PT",
    "PMI",
    "IP",
    "IG",
    "OTK",
    "FAT",
    "BLS",
    "KOM",
    "UPK",
    "GF",
    "VF",
    "T",
    "T1",
    "T2",
    "T3",
    "R",
    "R1",
    "R2",
    "AO",
    "OK",
    "MS",
    "TR",
    "PS",
    "M",
    "MG",
  ],



    // untouched ids:
    АКА
    PLA
    LRA
    WRA
    KG
    PLAР
    PLAT
    SVA
    Р
    Р1
    РА
    GP
    Н
    V
    V1
    V2
    VP
    VP1
    GPP2
    KST
    SZ
    SBO
    AK
    PL
    RR
    SV
    SV1
    SV2
    SVR
    SVR1
    SK
    SK1
    SK2
    SKК
    SKP
    SKL
    RT
    UT
    MT
    PT
    PMI
    IP
    IG
    OTK
    FAT
    BLS
    КОМ
    UPK
    GF
    VF
    T
    T1
    T2
    T3
    R
    R1
    R2
    AO
    OK
    MS
    TR
    PS
    M
    MG

    // ids with legend

    Автоматическая кислородная резка
    АКА

    2
    Автоматическая плазменная резка
    PLA

    2
    Автоматическая лазерная резка
    LRA


    Автоматическая водяная резка
    WRA


    Кромкогиб
    KG


    Автоматическая плазменная резка профиля
    PLAР
    Vortman
    2
    Автоматическая плазменная резка труб
    PLAT


    Автоматическая сверловка
    SVA
    Vortman
    2
    Пила
    Р

    2
    Пила
    Р1

    2
    Пила автоматическая
    РА
    Vortman
    2
    Гибка на прессе
    GP


    Гильотина
    Н


    Трёхвалковые вальцы
    V


    Четырёхвалковые вальцы
    V1


    Четырёхвалковые вальцы
    V2


    Трёхвалковые ролики для профиля
    VP


    Трёхвалковые ролики для профиля
    VP1


    Пресс для гибки профиля
    GPP2


    Выполнение фасок и ласок
    KST

    2
    Слесарная зачистка
    SZ

    1;2;3
    Слесарно-сборочные работы
    SBO

    1;2;3
    Ручная кислородная резка
    AK

    1;2;3
    Ручная плазменная резка
    PL

    1;2;3
    Ручная рихтовка
    RR

    1;2;3
    Сверловка ручная(переносной сверлильный станок)
    SV

    1;2;3
    Сверлильный станок стационарный
    SV1

    2
    Радиально-сверлильный станок
    SV2


    Нарезка резьбы метчиком
    SVR

    1;2;3
    Нарезка резьбы метчиком на консоле
    SVR1


    Сварка ручная
    SK

    1;2;3
    Сварка трактором
    SK1


    Сварка трактором(тандем)
    SK2


    Сварка консолью
    SKК


    Сварка порталом
    SKP

    2/1
    Сварочная линия
    SKL

    1
    Рентгеновсий контроль
    RT

    1;2;3
    Ультрозвуковой контроль
    UT

    1;2;3
    Магнито-порошковый контроль
    MT

    1;2;3
    Цветная дефектоскопия
    PT

    1;2;3
    Спектральный анализ
    PMI

    1;2;3
    Пневмоиспытания
    IP

    1;2;3
    Гидравлические испытания
    IG

    1;2;3
    Приёмка инспектора
    OTK

    1;2;3
    ФАТ-тест
    FAT

    1;2;3
    Статическая балансировка
    BLS


    Комплектация
    КОМ

    1;2;3
    Упаковка
    UPK


    Горизонтально-фрезерный станок
    GF


    Вертикально-фрезерный станок
    VF


    Токарный станок малый
    T


    Токарный станок средний
    T1


    Токарный станок Арлекон
    T2


    Токарно-лобовый станок
    T3


    Расточной
    R


    Расточной средний
    R1


    Расточной большой
    R2


    Дробеструйка; пескоструйка
    AO

    9;11
    Окраска
    OK

    9;11;12
    Металлизация
    MS


    Травление
    TR


    Пассивация
    PS


    Мойка
    M

    9;11;12
    Мойка горячей водой
    MG

    9;11;12


},
*/
