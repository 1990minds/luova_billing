const CracoLessPlugin = require('craco-less');


module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': 'grey',
            //  '@select-border-color':"grey",
            //  '@input-border-color':"grey",
             '@input-bg':"#FFF",
             '@picker-bg':"#FFF",
             '@input-icon-color':"grey",
             '@table-expanded-row-bg':"#fcfeff",
             '@body-background':'#fcfeff',
             '@input-height-base': '36px',
             '@border-radius-base':'4px',
             '@border-color-base':'grey',
             '@box-shadow-base':'0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
            '@font-family':'"Poppins", sans-serif',
            '@font-size-base':'16px',
            '@modal-heading-color': 'grey',
            '@btn-disable-border':'0px solid #fff'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ]
};