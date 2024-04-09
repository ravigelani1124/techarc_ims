import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: '#2196f3', // Material Design primary color
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 8, // Added padding
    backgroundColor: '#f5f5f5', // White background
    borderRadius: 4,
    border: '1px solid #ccc', // Border style
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)', // Material Design shadow
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333333', // Dark gray color
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#666666', // Medium gray color
  },
  documentContainer: {
    padding: 20,
    fontFamily: 'Roboto', // Default font for the document
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333333', // Dark gray color
  },
  requiredText: {
    color: '#f44336', // Material Design red color
  },
  optionalText: {
    color: '#4caf50', // Material Design green color
  },
});

Font.register({
  family: 'Roboto',
  src: 'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fBBc9.ttf',
});

const Quixote = ({ data }) => (
  <Document>
    <Page size="A4">
      <View style={styles.documentContainer}>
        <Text style={styles.title}>TechArc</Text>
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
      </View>
    </Page>
  </Document>
);

const PDFGenerator = ({ data }) => {
  return <Quixote data={data} />;
};

export default PDFGenerator;
