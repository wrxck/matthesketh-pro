import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, Link } from '@react-pdf/renderer';
import { config } from '../site.config';
const { identity, experience, skills, projects, contact } = config;

const BORDER_COLOR = '#000';

const sanitizeText = (text: string) => text.replace(/‑/g, '-');

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontFamily: 'Courier',
    fontSize: 8.5,
    lineHeight: 1.4,
    flexDirection: 'row',
  },
  columnLeft: {
    width: '50%',
    paddingRight: 8,
    display: 'flex',
    flexDirection: 'column',
  },
  columnRight: {
    width: '50%',
    paddingLeft: 8,
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    border: `1pt solid ${BORDER_COLOR}`,
    padding: 12,
    marginBottom: 12,
  },
  heading: {
    fontSize: 7.5,
    fontFamily: 'Courier-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    paddingBottom: 4,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Courier-Bold',
    marginBottom: 4,
  },
  roleTitle: {
    fontSize: 9,
    color: '#444',
  },
  summaryText: {
    marginBottom: 6,
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  link: {
    color: '#000',
    textDecoration: 'none',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  entry: {
    marginBottom: 12,
  },
  entryHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  entryTitle: {
    fontFamily: 'Courier-Bold',
    flexShrink: 1,
    paddingRight: 10,
  },
  meta: {
    color: '#666',
    fontSize: 8,
  },
  entryRole: {
    color: '#555',
    marginBottom: 4,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletPoint: {
    width: 10,
    color: '#666',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    gap: 4,
  },
  tag: {
    fontSize: 7.5,
    color: '#666',
    border: '1pt solid #ddd',
    padding: '1pt 3pt',
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  skillCat: {
    fontFamily: 'Courier-Bold',
    marginRight: 4,
  },
});

const CvPdf = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.columnLeft}>
        <View style={styles.card}>
          <Text style={styles.name}>{sanitizeText(identity.name)}</Text>
          <Text style={styles.roleTitle}>{sanitizeText(identity.title)}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Experience</Text>
          {experience.map((exp, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryHead}>
                <Text style={styles.entryTitle}>{sanitizeText(exp.company)}</Text>
                <Text style={styles.meta}>{sanitizeText(exp.period)}</Text>
              </View>
              <Text style={styles.entryRole}>{sanitizeText(exp.title)}</Text>
              {exp.bullets.map((b, j) => (
                <View key={j} style={styles.bullet}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={{ flex: 1 }}>{sanitizeText(b)}</Text>
                </View>
              ))}
              {exp.stack && exp.stack.length > 0 && (
                <View style={styles.tags}>
                  {exp.stack.map((tag, j) => (
                    <Text key={j} style={styles.tag}>{sanitizeText(tag)}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.columnRight}>
        <View style={styles.card}>
          {identity.summary.map((paragraph, i) => (
            <Text key={i} style={styles.summaryText}>{sanitizeText(paragraph)}</Text>
          ))}
          <View style={styles.links}>
            {contact.map((c, i) => (
              <Link key={i} src={sanitizeText(c.url)} style={styles.link}>
                {sanitizeText(c.label)}
              </Link>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Skills</Text>
          {skills.map((cat, i) => (
            <View key={i} style={styles.skillRow}>
              <Text style={styles.skillCat}>{sanitizeText(cat.name)}:</Text>
              <Text>{sanitizeText(cat.items.join(', '))}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Projects</Text>
          {projects.map((proj, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryHead}>
                <Text style={styles.entryTitle}>{sanitizeText(proj.name)}</Text>
              </View>
              <Text style={styles.meta}>{sanitizeText(proj.description)}</Text>
              {proj.details.map((b, j) => (
                <View key={j} style={styles.bullet}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={{ flex: 1 }}>{sanitizeText(b)}</Text>
                </View>
              ))}
              {proj.url && (
                <Link src={sanitizeText(proj.url)} style={styles.link}>View</Link>
              )}
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export const generatePdfBlob = async () => {
  const asPdf = pdf(<CvPdf />);
  return await asPdf.toBlob();
};
