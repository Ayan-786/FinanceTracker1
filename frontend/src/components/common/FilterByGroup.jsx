import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQueryParams } from "../../hooks/queryString"
import { GROUPS_LIST } from "../../urls"
import { useLoad } from '../../hooks/request'
import { stringify } from 'query-string'
import Select from 'react-select'

export default function FilterByGroup() {
    const history = useHistory()
    const params = useQueryParams()
    const branch = useLoad({ url: GROUPS_LIST, params })
    const branchItems = branch.response ? branch.response.results : []
    const filteredBranchItems = branchItems.filter(item => !item.isArchive)
    const mappedBranchItems = filteredBranchItems.map((item) => ({
        id: item?.id,
        name: item?.name ?? '',
        phone: item?.phone ?? '',
        count: item?.count ?? '0',
    }))
    const branchs = [{id:'allBranchs', name: 'Все Группы', count: 0 }, ...mappedBranchItems]
    const activeBranch = params.group ? branchs?.find(item => (item.id == params.group)) : branchs[0]

    function handleBranchFilterClick(item) {
        if(item.id === 'allBranchs'){
            history.push(`?${stringify({ ...params, group:undefined })}`)
        } else {
            history.push(`?${stringify({ ...params, group:item.id })}`)
        }
    }

    return (
        <Select 
            styles={{
                control: (base) => ({
                    ...base,
                    width:'180px',
                    fontSize: '12px',
                    height: '40px'
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