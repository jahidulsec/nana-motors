import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const SellForm = ({id}: {id: any}) => {
  return (
    <>
        <form action="">
            <p>
                <Label htmlFor='model'>Model Name</Label>
                <Input type='text' name='model' id='model' />
            </p>
        </form>
    </>
  )
}

export default SellForm