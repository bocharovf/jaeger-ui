// Copyright (c) 2019 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import queryString from 'query-string';

import { History as RouterHistory, Location } from 'history';

import { TNil } from '../types';

export default function updateUiErrorsOnly({
  history,
  location,
  uiErrorsOnly
}: {
  history: RouterHistory;
  location: Location;
  uiErrorsOnly?: boolean | TNil;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { uiFind: _oldUiFind, uiErrorsOnly: _oldUiErrorsOnly, ...queryParams } = queryString.parse(location.search);
  
  _oldUiFind = Array.isArray(_oldUiFind) ? _oldUiFind.join(' ') : _oldUiFind;
  _oldUiErrorsOnly = Array.isArray(_oldUiErrorsOnly) ? _oldUiErrorsOnly.join(' ') : _oldUiErrorsOnly;
  
  if (_oldUiFind) (queryParams as Record<string, string>).uiFind = _oldUiFind;
  if (uiErrorsOnly !== undefined) (queryParams as Record<string, string>).uiErrorsOnly = String(uiErrorsOnly);

  history.replace({
    ...location,
    search: `?${queryString.stringify(queryParams)}`,
  });
}



