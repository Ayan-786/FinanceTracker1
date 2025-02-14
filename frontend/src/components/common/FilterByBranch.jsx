import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQueryParams } from "../../hooks/queryString"
import { BRANCH_LIST } from "../../urls"
import { useLoad } from '../../hooks/request'
import { stringify } from 'query-string'
import Select from 'react-select'

export default function FilterByBranch() {
    const history = useHistory()
    const params = useQueryParams()
    const branch = useLoad({ url: BRANCH_LIST, params })
    const branchItems = branch.response ? branch.response : []
    const mappedBranchItems = branchItems.map((item) => ({
        id: item?.id,
        name: item?.name ?? '',
        phone: item?.phone ?? '',
        count: item?.count ?? '0',
    }))
    const branchs = [{ id:"allBranchs", name: 'Все филиалы', count: 0 }, ...mappedBranchItems]
    const activeBranch = params.company ? branchs?.find(item => (item.id == params.company)) : branchs[0]
    function handleBranchFilterClick (item) {
        if(item.id === 'allBranchs'){
            history.push(`?${stringify({ ...params, company:undefined })}`)
        } else {
            history.push(`?${stringify({ ...params, company:item.id })}`)
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
                }),
                container: base => ({
                    ...base,
                    zIndex: 10,
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


