import React from 'react'
import { StyleSheet,Button, Alert, Text, View } from 'react-native'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';

const data = {
  nombre:'Nahuel Obregon',
  direccion:'Surco',
  pedido1:'234235224545456',
  pedido2:'312321344244',
  //destino
  nombreDestino:'Alonso Zegarra Huamalies',
  direccionDestino:'miraflores',
  REF:'parque kenedi',
  telefono:'936278926',
  detalle:'dasdasdsdasdfaafafadfdasgagrgaghehhrthrthnrbnrtbdbhdbbtehetge'
}

const App = () => {
  const htmlContent = `
  <html>
  <head>
  <meta charset="utf-8">
<style>
${htmlStyles}
</style>
  </head>
  <body>
    <table class="inventory">
      <thead>
        <tr>
          <th>N°PEDIDO1: ${data.pedido1}</th>
          <th>N°PEDIDO2: ${data.pedido2}</th>
        </tr>
      </thead>
    </table>
    <header>
      <h1>ORIGEN</h1>
       <address>
        <p>NOMBRE Y APELLIDO O RAZÓN SOCIAL:</p>
        <p>${data.nombre}</p>
        <p>DIRECCIÓN: ${data.direccion}</p>
      </address>
    </header>
    <header>
      <h1>DESTINO</h1>
       <address>
        <p>NOMBRE Y APELLIDO O RAZON SOCIAL:</p>
        <p>${data.nombreDestino}</p>
        <p>DIRECCIÓN: ${data.direccionDestino}</p>
        <p>REF: ${data.REF}</p>
        <p>TELEFONO: ${data.telefono}</p>
        <p>DETALLES DE LA ENTREGA: </p>
        <table class="inventory">
          <thead>
            <tr>
              <th>${data.detalle}</th>
            </tr>
          </thead>
        </table>
      </address>
    </header>
  </body>
</html>`;
      
  const createPDF = async () => {
    let options = {
      html: htmlContent,
      fileName: 'Documento Flitgo',
      directory: 'Download',

      base64: true
    };

    let file = await RNHTMLtoPDF.convert(options)
    Alert.alert('Exportado correctamente', 'Ruta:' + file.filePath, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Abrir', onPress: () => openFile(file.filePath) }
    ], { cancelable: true });

  }

  const openFile = (filepath) => {
    const path = filepath;
    FileViewer.open(path)
      .then(() => {
      })
      .catch(error => {
      });
  }
  return (
    <View style={styles.MainContainer}>
       <Button onPress={createPDF}  title='imprimir'/>
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'center',
  },
});
const htmlStyles = `
*{
  border: 0;
  box-sizing: content-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
}
h1 { font: bold 100% sans-serif; letter-spacing: 0.2em; text-align: center; text-transform: uppercase; }
/* table */
table { font-size: 75%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.5em; position: relative;} 

th, td { border-radius: 0.25em; border-style: solid; }
th { background: #FFF; border-color: rgb(170, 170, 170); }
td { border-color: #DDD; }
/* page */
html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.55in; }
body { background: #FFF; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); border-color: rgba(0, 0, 0, 0.5); }
/* header */
header { margin: 0 0 3em; }
header:after { clear: both; content: ""; display: table; }
header h1 {  border-radius: 0.25em; color: #000; margin: 0 0 1em; padding: 0.5em 0; }
header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
header address p { margin: 0 0 0.25em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }
/* article */
article, article address, table.meta, table.inventory , table.ini { margin: 0 0 4em;}

article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }
article address { float: left; font-size: 125%; font-weight: bold; }
/* table meta & balance */
table.meta, table.balance { float: right; width: 36%; }
table.meta:after, table.balance:after, table.ini:after { clear: both; content: ""; display: table; }
/* table meta */
table.meta th { width: 40%; }
table.meta td { width: 60%; }
/*table ini*/
table.ini {float: left; width: 90%;}
table.ini th { width: 40%; }
table.ini td { width: 60%; }
/* table meta */
/* table items */
table.inventory { clear: both; width: 100%;}
table.inventory th { font-weight: bold; text-align:start; }
table.inventory td:nth-child(1) { width: 26%; }
table.inventory td:nth-child(2) { width: 38%; }
table.inventory td:nth-child(3) { text-align: right; width: 12%; }
table.inventory td:nth-child(4) { text-align: right; width: 12%; }
table.inventory td:nth-child(5) { text-align: right; width: 12%; }
/* table balance */
table.balance th, table.balance td { width: 50%; }
table.balance td { text-align: right; }
/* aside */
aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
aside h1 { border-color: #999; border-bottom-style: solid; }
`;

// librerias que use
// npm install react-native-file-viewer --save
//npm install react-native-html-to-pdf --save