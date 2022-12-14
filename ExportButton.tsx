import { onExportBasicExcelWithStyle, onExportMultiHeaderExcel } from '@/utils/excel'
import { ExportOutlined } from '@ant-design/icons'
import { ModalForm, ProFormText } from '@ant-design/pro-form'
import { Button } from 'antd'
import { isEmpty } from 'lodash-es'
import type { FC } from 'react'

const ExportButton: FC<{
  dataSource: any[] | undefined | undefined
  columns: any[] | undefined
  key?: 'export'
  multipleHeader?: boolean
  buttonProps?: any
}> = (props) => {
  const { columns = [], dataSource = [], key = 'key', multipleHeader, buttonProps } = props

  const filterColumns = columns?.filter((column) => !column.hideInTable)

  if (isEmpty(filterColumns) || isEmpty(dataSource)) {
    return (
      <Button type="primary" {...buttonProps}>
        <ExportOutlined />
        导出
      </Button>
    )
  }

  return (
    <ModalForm
      key={key}
      title="导出excel"
      onFinish={async (formData: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        multipleHeader
          ? onExportMultiHeaderExcel({
              columns: filterColumns,
              dataSource,
              formData,
            })
          : onExportBasicExcelWithStyle({
              columns: filterColumns,
              dataSource,
              formData,
            })
        return true
      }}
      trigger={
        <Button {...buttonProps}>
          <ExportOutlined />
          导出
        </Button>
      }
    >
      <ProFormText label="文件名" width="md" name="filename" initialValue="excel" />
    </ModalForm>
  )
}

export default ExportButton
