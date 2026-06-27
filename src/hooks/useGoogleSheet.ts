import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import type { ProjectData } from '../types';

const SHEET_URLS = [
  'https://docs.google.com/spreadsheets/d/1vWyDm-L_yKe_3gH-j1qJ94lpcayoG_gq-14dI4oZKjI/export?format=csv&gid=1633684811',
  'https://docs.google.com/spreadsheets/d/1vWyDm-L_yKe_3gH-j1qJ94lpcayoG_gq-14dI4oZKjI/export?format=csv&gid=0',
  'https://docs.google.com/spreadsheets/d/1DAz0b3NiXrm2ZUul4eWCyKnyW69y0CyB1vlUVj61nG4/export?format=csv&gid=2081111157'
];

// Helper to parse budget strings into numerical values (in billions) for easier sorting/filtering
const parseBudget = (budgetStr: string): number => {
  if (!budgetStr) return 0;
  const cleaned = budgetStr.toLowerCase().replace(/[^0-9.]/g, '');
  const number = parseFloat(cleaned);
  if (isNaN(number)) return 0;
  
  if (budgetStr.toLowerCase().includes('billion')) {
    return number;
  }
  if (budgetStr.toLowerCase().includes('million')) {
    return number / 1000;
  }
  return number;
};

const adjustDeadline = (deadline: string): string => {
  if (!deadline) return '';
  let updated = deadline;
  updated = updated.replace(/2025/g, '2027');
  updated = updated.replace(/2026/g, '2028');
  updated = updated.replace(/2027/g, '2029');
  return updated;
};

const fetchAndParseCSV = (url: string): Promise<ProjectData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData: ProjectData[] = (results.data as any[])
          .filter(row => row.Project && row.Project.trim() !== '') // Ensure project exists
          .map(row => ({
            Country: row.Country || '',
            Project: row.Project || '',
            Summary: row['Summary '] || row.Summary || '', // Handle the trailing space in column name
            Category: row.Category || '',
            Area: row.Area || '',
            Budget: row.Budget || '',
            Deadline: adjustDeadline(row.Deadline || ''),
            Location: row.Location || '',
            ParsedBudget: parseBudget(row.Budget || '')
          }));
        resolve(parsedData);
      },
      error: (err: any) => {
        reject(new Error(err.message || 'Failed to fetch data'));
      }
    });
  });
};

export const useGoogleSheet = () => {
  const [data, setData] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch all sheets in parallel
        const results = await Promise.all(SHEET_URLS.map(url => fetchAndParseCSV(url)));
        
        // Combine the results from all sheets
        let combinedData = results.flat();
        
        // Some rows might be missing Country if they are grouped, let's carry forward the last seen country
        let lastCountry = '';
        const cleanedData = combinedData.map(row => {
          if (row.Country && row.Country.trim() !== '') {
            lastCountry = row.Country.trim();
          } else {
            row.Country = lastCountry;
          }
          return row;
        });

        setData(cleanedData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
