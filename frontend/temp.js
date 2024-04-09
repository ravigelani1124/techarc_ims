import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';

// Define the logo URL
const logoUrl = 'https://example.com/path-to-your-logo.png';

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Oswald',
    color: '#007bff', // Blue color
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dark gray color
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: '#f5f5f5', // Light gray background
    borderRadius: 2,
    border: '1px solid #ccc', // Border style
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#555', // Medium gray color
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#666', // Light gray color
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333', // Dark gray color
  },
  contactDetails: {
    marginTop: 5,
  },
  requiredText: {
    color: 'red',
  },
  optionalText: {
    color: 'green',
  },
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const Quixote = ({ data }) => (
  <Document>
    <Page size="A4">
      <View style={styles.documentContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>Company Name</Text>
            <Text>Your Company Tagline</Text>
          </View>
          <Image src={logoUrl} style={styles.logo} />
        </View>

        {/* Main Content Sections */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Application Details:</Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Application:</Text> {data.appointment.application_code} :{' '}
            {data.appointment.application_type}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Sub Application:</Text> {data.appointment.appsub_code} :{' '}
            {data.appointment.appsub_type}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Consultant Details:</Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Name:</Text> {data.consultant.consultant_name_en}
          </Text>

          <Text style={styles.text}>
            <Text style={styles.boldText}>Contact:</Text> {data.consultant.consultant_email},{' '}
            {data.consultant.consultant_phone}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Address:</Text> {data.consultant.street_no},{' '}
            {data.consultant.street_name}, {data.consultant.city}, {data.consultant.state},{' '}
            {data.consultant.zip}, {data.consultant.country}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Timeslot:</Text>
          <Text style={styles.text}>
            {data.appointment.timeslot_date} {data.appointment.timeslot_start_time} -{' '}
            {data.appointment.timeslot_end_time}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Documents:</Text>
          {data.appointment.documents.map((doc) => (
            <Text
              key={doc._id}
              style={[styles.text, doc.is_optional ? styles.optionalText : styles.requiredText]}>
              {doc.document_name} - {doc.is_optional ? 'Optional' : 'Required'}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Price Details:</Text>
          <Text style={styles.text}>Consultant Fees:</Text> {data.appointment.consultant_fee}
        </View>

        {/* Other Content Sections */}
        {/* Add other sections as needed */}

      </View>
    </Page>
  </Document>
);

const PDFGenerator = ({ data }) => {
  return <Quixote data={data} />;
}

export default PDFGenerator;
