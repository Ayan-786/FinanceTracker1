import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQueryParams } from "../../hooks/queryString"
import { EMPLOYEE_LIST } from "../../urls"
import { useLoad } from '../../hooks/request'
import { stringify } from 'query-string'
import Select from 'react-select'

export default function FilterByEmployee() {
    const history = useHistory()
    const params = useQueryParams()
    const branch = useLoad({ url: EMPLOYEE_LIST, params: { ...params, size: 1000 } })
    const branchItems = branch.response ? branch.response.results : []
    const mappedBranchItems = branchItems.map((item) => ({
        id: item?.id,
        name: item?.name ?? '',
        phone: item?.phone ?? '',
        count: item?.count ?? '0',
    }))
    const branchs = [{ id: 'allBranchs', name: 'Все Сотрудники', count: 0 }, ...mappedBranchItems]
    const activeBranch = params.group ? branchs?.find(item => (item.id == params.group)) : branchs[0]

    function handleBranchFilterClick(item) {
        if (item.id === 'allBranchs') {
            history.push(`?${stringify({ ...params, employee: undefined })}`)
        } else {
            history.push(`?${stringify({ ...params, employee: item.id })}`)
        }
    }

    return (
        <Select
            styles={{
                control: (base) => ({
                    ...base,
                    width: '180px',
                    fontSize: '12px',
                })
            }}
            onChange={handleBranchFilterClick}
            value={activeBranch}
            options={branchs}
            getOptionLabel={opt => opt.name}
            getOptionValue={opt => opt.id}
        />
    )
}
