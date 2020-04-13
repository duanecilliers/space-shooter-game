interface IDevConfig {
  COMPOSITION_INFO: {
    ENABLE: boolean;
    ENABLE_FILTER: boolean;
    FILTER: string[];
    ENABLE_FACTORY_FILTER: boolean;
    FACTORY_FILTER: string[];
  };
}

const devConfig: IDevConfig = {
  COMPOSITION_INFO: {
    ENABLE: false,
    ENABLE_FILTER: false,
    FILTER: [],
    ENABLE_FACTORY_FILTER: false,
    FACTORY_FILTER: ['Note'],
  },
}

export default devConfig
