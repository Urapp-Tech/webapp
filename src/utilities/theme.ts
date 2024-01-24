import { ThemeColor } from '../types/app.types';

function randomize() {
  const list = [
    {
      id: 'dc836149-62b7-4a1e-be60-dff5155693db',
      key: 'LightGreen',
      value: {
        themeColor: {
          faded: '#6A6A6A',
          primary: '#8CAC89',
          secondary: '#1A1A1A',
          background: '#F3FFF2',
          foreground: '#FFFFFF',
          secondary2: '#ACC5AA',
        },
        categoryColor: [
          '#E1CCEC',
          '#C8D9DF',
          '#FFE2E2',
          '#C8D9EB',
          '#DFD3C3',
          '#D9D9D9',
        ],
      },
      createdDate: '2024-01-23T04:50:44.195Z',
    },
    {
      id: 'b5c45e3c-f7a1-4b07-a8a3-00e3bd36732e',
      key: 'LightBrown',
      value: {
        themeColor: {
          faded: '#6A6A6A',
          primary: '#E2BB9D',
          secondary: '#1A1A1A',
          background: '#FFF9F4',
          foreground: '#FFF',
          secondary2: '#E5C2A7',
        },
        categoryColor: [
          '#E1CCEC',
          '#C8D9DF',
          '#FFE2E2',
          '#C8D9EB',
          '#DFD3C3',
          '#D9D9D9',
        ],
      },
      createdDate: '2024-01-22T06:45:58.400Z',
    },
    {
      id: 'a102f92f-91fc-4056-93fa-f54098eabd9c',
      key: 'LightYellow',
      value: {
        themeColor: {
          faded: '#6A6A6A',
          primary: '#FFF6B4',
          secondary: '#1A1A1A',
          background: '#FFFDEF',
          foreground: '#FFF',
          secondary2: '#E8E0A5',
        },
        categoryColor: [
          '#E1CCEC',
          '#C8D9DF',
          '#FFE2E2',
          '#C8D9EB',
          '#DFD3C3',
          '#D9D9D9',
        ],
      },
      createdDate: '2024-01-22T05:58:52.571Z',
    },
    {
      id: '5e151485-3660-452f-8d05-0897efb953e0',
      key: 'SeaBlue',
      value: {
        themeColor: {
          faded: '#6A6A6A',
          primary: '#CDF5F5',
          secondary: '#1A1A1A',
          background: '#F6FFFF',
          foreground: '#FFF',
          secondary2: '#BBDFDF',
        },
        categoryColor: [
          '#E1CCEC',
          '#C8D9DF',
          '#FFE2E2',
          '#C8D9EB',
          '#DFD3C3',
          '#D9D9D9',
        ],
      },
      createdDate: '2024-01-22T01:38:44.090Z',
    },
    {
      id: 'd2f75efd-9ea9-4a0c-9afe-da61cb35dbd8',
      key: 'Purple',
      value: {
        themeColor: {
          faded: '#6A6A6A',
          primary: '#756AB6',
          secondary: '#1A1A1A',
          background: '#F5F3FF',
          foreground: '#FFF',
          secondary2: '#8379BD',
        },
        categoryColor: [
          '#E1CCEC',
          '#C8D9DF',
          '#FFE2E2',
          '#C8D9EB',
          '#DFD3C3',
          '#D9D9D9',
        ],
      },
      createdDate: '2024-01-22T00:43:07.428Z',
    },
    {
      id: 'de56911b-6b5e-4116-8489-a2a46533d67e',
      key: 'Gray',
      value: {
        themeColor: {
          faded: '#6A6A6A',
          primary: '#9A9A9A',
          secondary: '#1A1A1A',
          background: '#F9F9F9',
          foreground: '#FFF',
          secondary2: '#A4A4A4',
        },
        categoryColor: [
          '#E1CCEC',
          '#C8D9DF',
          '#FFE2E2',
          '#C8D9EB',
          '#DFD3C3',
          '#D9D9D9',
        ],
      },
      createdDate: '2024-01-19T08:08:48.911Z',
    },
    {
      id: 'e71ebbca-e899-4af8-9548-90befb2e5ca8',
      key: 'Blue',
      value: {
        themeColor: {
          faded: '#6A6A6A',
          primary: '#1D4675',
          secondary: '#1A1A1A',
          background: '#F1F8FF',
          foreground: '#FFF',
          secondary2: '#769FCD',
        },
        categoryColor: [
          '#E1CCEC',
          '#C8D9DF',
          '#FFE2E2',
          '#C8D9EB',
          '#DFD3C3',
          '#D9D9D9',
        ],
      },
      createdDate: '2024-01-19T05:58:19.331Z',
    },
    {
      id: 'c3bc6c53-d73e-47de-b4d8-fa35e46a5057',
      key: 'Green',
      value: {
        themeColor: {
          faded: '#6A6A6A',
          primary: '#59CE8F',
          secondary: '#1A1A1A',
          background: '#EEFFF6',
          foreground: '#FFF',
          secondary2: '#083626',
        },
        categoryColor: [
          '#E1CCEC',
          '#C8D9DF',
          '#FFE2E2',
          '#C8D9EB',
          '#DFD3C3',
          '#D9D9D9',
        ],
      },
      createdDate: '2024-01-19T05:56:16.884Z',
    },
    {
      id: 'c5478640-9268-46f2-8425-eb60908e216c',
      key: 'Default',
      value: {
        themeColor: {
          faded: '#6A6A6A',
          primary: '#1D1D1D',
          secondary: '#1A1A1A',
          background: '#F0F0F0',
          foreground: '#FFF',
          secondary2: '#343434',
        },
        categoryColor: [
          '#E1CCEC',
          '#C8D9DF',
          '#FFE2E2',
          '#C8D9EB',
          '#DFD3C3',
          '#D9D9D9',
        ],
      },
      createdDate: '2024-01-19T05:50:09.801Z',
    },
  ];

  let i = 0;
  setInterval(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-faded', list[i].value.themeColor.faded);
    root.style.setProperty('--color-primary', list[i].value.themeColor.primary);
    root.style.setProperty(
      '--color-secondary',
      list[i].value.themeColor.secondary
    );
    root.style.setProperty(
      '--color-background',
      list[i].value.themeColor.background
    );
    root.style.setProperty(
      '--color-foreground',
      list[i].value.themeColor.foreground
    );
    root.style.setProperty(
      '--color-secondary2',
      list[i].value.themeColor.secondary2
    );
    i = (i + 1) % list.length;
  }, 2500);
}

function setThemeColor(themeColor: ThemeColor) {
  const root = document.documentElement;
  root.style.setProperty('--color-faded', themeColor.faded);
  root.style.setProperty('--color-primary', themeColor.primary);
  root.style.setProperty('--color-secondary', themeColor.secondary);
  root.style.setProperty('--color-background', themeColor.background);
  root.style.setProperty('--color-foreground', themeColor.foreground);
  root.style.setProperty('--color-secondary2', themeColor.secondary2);
  // Remove Randomize On Production
  randomize();
}

export default setThemeColor;
