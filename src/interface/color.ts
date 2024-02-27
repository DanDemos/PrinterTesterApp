interface THEME_INTERFACE {
  mode: string;
  colors: {name: string, code: string}[];
  getColors(): {}
}

export class THEME implements THEME_INTERFACE {  
  mode: string;
  colors: {name: string, code: string}[];

  constructor(mode: string, colors: {name: string, code: string}[]) {
    this.mode = mode;
    this.colors = colors;
  }

  getColors(): {} {
    let colors : any = {};
    this.colors.map((item) : void => {
      colors[item.name] = item.code
    })
    return colors;
  }
}
