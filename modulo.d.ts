interface ModuloOptions {
  path: string;
}

declare function Modulo<T>(options: ModuloOptions): Promise<T>;

export default Modulo;
