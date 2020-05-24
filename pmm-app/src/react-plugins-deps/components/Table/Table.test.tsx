import React from 'react';
import { mount, shallow } from 'enzyme';
import Table from './Table';

const columns = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Test column',
    accessor: 'test',
  },
  {
    Header: 'Another test column',
    accessor: 'test2',
  },
];

const rows = [
  { id: 1, test: 1, test2: 1 },
  { id: 2, test: 1, test2: 1 },
  { id: 3, test: 1, test2: 1 },
  { id: 4, test: 1, test2: 1 },
];
describe('Table', () => {
  it('Render correct amount of rows', () => {
    const root = shallow(<Table columns={columns} data={rows} />);

    expect(root.find('[data-qa="table-row"]').length).toEqual(rows.length);
    expect(root.find('[data-qa="table-header"]').length).toEqual(1);
  });

  it('Render no data section of empty rows passed', () => {
    const root = shallow(<Table columns={columns} data={[]} />);
    console.log(root.text());

    expect(root.find('[data-qa="table-row"]').length).toEqual(0);
    expect(root.find('[data-qa="table-no-data"]').length).toEqual(1);
  });

  xit('Render action panel and checkboxes section if ActionPanel passed', () => {
    const ActionPanel = <div data-qa="action-panel"></div>;
    const root = mount(<Table columns={columns} data={rows} ActionPanel={ActionPanel} />);
    expect(root.find('[data-qa="select-all"]').length).toEqual(1);
    expect(root.find('[data-qa="select-row"]').length).toEqual(rows.length);
  });

  it('Render custom no data section if its passed', () => {
    const noData = <div data-qa="custom-no-data">123</div>;
    const root = shallow(<Table columns={columns} data={[]} noData={noData} />);
    expect(root.find('[data-qa="table-no-data"]').length).toEqual(1);
    expect(root.find('[data-qa="custom-no-data"]').length).toEqual(1);
  });
});
