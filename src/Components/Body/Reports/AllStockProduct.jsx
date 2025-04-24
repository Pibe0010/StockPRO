import { Document, Page, View, Text, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import styled from "styled-components";
import {
  CompanyStore,
  ErrorPage,
  GenericList,
  ProductStore,
  Search,
} from "../../../index.js";
import { useQuery } from "@tanstack/react-query";
import SpinnerLoader from "../../Molecules/SpinnerLoader.jsx";
import { useState } from "react";

const currentDate = new Date();
const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

const AllStockProduct = () => {
  const [listProducts, setListProducts] = useState(false);
  const {
    allReportStockProduct,
    searchProduct,
    search,
    setSearch,
    selectProduct,
    selectItemProduct,
  } = ProductStore();
  const { dataCompany } = CompanyStore();

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "all report stock products",
      { id_company: dataCompany?.id, id: selectItemProduct?.id },
    ],
    queryFn: () =>
      allReportStockProduct({ id_company: dataCompany?.id, id: selectItemProduct?.id }),
    enabled: !!dataCompany,
  });

  const {
    data: dataSearchProduct,
    isLoading: isLoadingSearchProduct,
    error: errorSearchProduct,
  } = useQuery({
    queryKey: ["search product", { _id_company: dataCompany?.id, search: search }],
    queryFn: () => searchProduct({ _id_company: dataCompany?.id, search: search }),
    enabled: !!dataCompany.id,
  });

  if (isLoading) return <SpinnerLoader />;

  if (error) return <ErrorPage message={error.message} />;

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      position: "relative",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: "ultraBold",
      marginBottom: 10,
    },
    table: {
      width: "100%",
      margin: "auto",
      marginBottom: 10,
    },
    row: {
      flexDirection: "row",
      marginBottom: 1,
      alignItems: "stretch",
      height: 24,
      borderBottomWidth: 1,
      borderBottomColor: "#121212",
      borderLeftWidth: 1,
      borderLeftColor: "#000",
      textAlign: "left",
      justifyContent: "flex-start",
    },
    cell: {
      flex: 1,
      textAlign: "center",
      /* fontFamily: "inconsolata", */
      borderLeftColor: "#000",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    headerCell: {
      flex: 1,
      backgroundColor: "#d1d1d1",
      fontWeight: "bold",
      /* fontFamily: "inconsolata", */
      textAlign: "center",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    dateText: {
      marginBottom: 10,
    },
  });

  const renderTableRow = (rowData, isHeader = false) => (
    <View style={styles.row} key={rowData.id}>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.description}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>{rowData.stock}</Text>
    </View>
  );

  return (
    <Container>
      <Search
        setSearch={setSearch}
        handlerFunction={() => setListProducts(!listProducts)}
      />
      {listProducts && (
        <GenericList
          data={dataSearchProduct}
          setState={() => setListProducts(!listProducts)}
          handlerFunction={(params) => {
            selectProduct(params);
            setSearch("");
          }}
        />
      )}

      <PDFViewer className="pdfViewer">
        <Document title="All reports of stock">
          <Page size="A4" orientation="portrait">
            <View style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.title}>All current stock product</Text>
                <Text style={styles.dateText}>Date and time: {formattedDate}</Text>
                <View>
                  {renderTableRow({ description: "Product", stock: "Stock" }, true)}
                  {data?.map((item) => renderTableRow(item))}
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 15px;
  .pdfViewer {
    width: 100%;
    height: 100%;
  }
`;

export default AllStockProduct;
