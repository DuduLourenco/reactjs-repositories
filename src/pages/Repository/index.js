import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  SelectIssueState,
  Pagination,
} from './styles';

export default class Repository extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    repository: {},
    issues: [],
    filter: 'all',
    loading: true,
    pageIndex: 1,
    selectData: [
      { value: 'all', label: 'All' },
      { value: 'open', label: 'Open' },
      { value: 'closed', label: 'Closed' },
    ],
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const { filter, pageIndex } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page: pageIndex,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  getIssues = async () => {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const { filter, pageIndex } = this.state;

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: 5,
        page: pageIndex,
      },
    });

    this.setState({
      issues: issues.data,
    });
  };

  handlePage = async (action) => {
    const { pageIndex } = this.state;
    await this.setState({
      pageIndex: action === 'next' ? pageIndex + 1 : pageIndex - 1,
    });
    this.getIssues();
  };

  handleFilter = async (e) => {
    const { value } = e.target;
    await this.setState({ filter: value });
    this.getIssues();
  };

  render() {
    const { repository, issues, loading, selectData, pageIndex } = this.state;

    if (loading) {
      return <Loading>Loading</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Back to repositories</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          Issue filter :{' '}
          <SelectIssueState name="filter" onChange={this.handleFilter}>
            {selectData.map((data) => (
              <option key={data.value} value={data.value}>
                {data.label}
              </option>
            ))}
          </SelectIssueState>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
          <Pagination>
            {pageIndex === 1 ? (
              <button type="button" disabled>
                Previous Page
              </button>
            ) : (
              <button type="button" onClick={() => this.handlePage('previous')}>
                Previous Page
              </button>
            )}

            <button type="button" onClick={() => this.handlePage('next')}>
              Next Page
            </button>
          </Pagination>
        </IssueList>
      </Container>
    );
  }
}
