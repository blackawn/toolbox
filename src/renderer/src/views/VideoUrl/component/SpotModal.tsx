import { useMemo, useState } from 'react'
import { Spot } from '@renderer/components/VideoPlayer'
import { Modal, Table, Tag } from 'antd'
import type { ModalProps, TableProps, TableColumnsType } from 'antd'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration.js'
import { message } from '@renderer/hooks/useAntdFeedback'

interface DataType {
  key: string
  startTime: number
  endTime: number | null
  color: string
}

type OnDownloadPayload = {
  startTime: number
  endTime: number
}

export interface SpotModalProps extends ModalProps {
  spot: Spot[]
  onDownload?: (payload: OnDownloadPayload[]) => void
}

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection']

dayjs.extend(duration)

const columns: TableColumnsType<DataType> = [
  {
    title: '选择',
    dataIndex: 'key'
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    render: (value) => {
      return value && <Tag>{dayjs.duration(value, 'seconds').format('HH:mm:ss')}</Tag>
    }
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    render: (value) => {
      return value && <Tag>{dayjs.duration(value, 'seconds').format('HH:mm:ss')}</Tag>
    }
  }
]

export const SpotModal: React.FC<SpotModalProps> = (props) => {
  const { spot, onDownload } = props

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: DataType) => ({
      disabled: !record.endTime
    }),
    selections: [
      {
        key: 'download',
        text: '下载',
        onSelect: () => {
          if (selectedRowKeys.length === 0) {
            message.warning('请选择时间段')
            return
          }

          const spot = spotList
            .filter((item) => selectedRowKeys.includes(item.key))
            .map((item) => ({
              startTime: item.startTime,
              endTime: item.endTime as number
            }))

          onDownload?.(spot)
        }
      }
    ]
  }

  const spotList = useMemo(() => {
    const groupedArray = Object.values(
      spot
        .toSorted((a, b) => {
          const aPrefix = parseInt(a.id.split('-')[0])
          const bPrefix = parseInt(b.id.split('-')[0])
          if (aPrefix !== bPrefix) return aPrefix - bPrefix
          return a.time - b.time
        })
        .reduce(
          (acc, curr) => {
            const [prefix] = curr.id.split('-')

            if (!acc[prefix]) {
              acc[prefix] = {
                key: prefix,
                startTime: curr.time,
                endTime: null,
                color: curr.color
              }
            } else {
              acc[prefix].endTime = curr.time
            }

            return acc
          },
          {} as Record<string, DataType>
        )
    )

    return groupedArray
  }, [spot])

  return (
    <Modal title="查看切片" closable footer={null} {...props}>
      <Table<DataType>
        rowSelection={rowSelection}
        dataSource={spotList}
        columns={columns}
        pagination={false}
        scroll={{ y: 400 }}
      />
    </Modal>
  )
}
