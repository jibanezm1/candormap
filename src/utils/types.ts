// types.ts

export interface ICuestionario {
    idCuestionario: string;
    idTipoCuestionario: string;
    imagenIcono: string;
    tiempoEstimado: string;
    titulo: string;
    valorMonetario: string;
  }
  
  export interface ITipoMision {
    idTipoMision: string;
    nombre: string;
  }
  
  export interface IMision {
    descripcion: string | null;
    distancia: string | null;
    idCuestionario: string;
    idCuestionario0: ICuestionario;
    idMision: string;
    idTipoMision: string;
    idTipoMision0: ITipoMision;
    lat: string;
    lng: string;
    recompensa: string;
    tiempo: string;
    titulo: string;
  }
  
  export type MisionesResponse = IMision[];
  