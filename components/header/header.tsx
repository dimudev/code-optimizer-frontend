'use client'
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CodeAction } from "@/types"
import { useAnalyzerStore } from "@/store/useAnalyzerStore"

interface ISelectOptions {
  label: string
  value: CodeAction
}

const items: Array<ISelectOptions> = [
  { label: "Optimize", value: "optimize" },
  { label: "Bugs", value: "bugs" },
  { label: "Explain", value: "explain" },
]

const Header = () => {

  const action = useAnalyzerStore(state => state.action)
  const setAction = useAnalyzerStore(state => state.setAction)

  return (
    <>
      <div className="flex flex-col justify-between w-full">
        <h1 className="font-semibold">Code Optimizer</h1>
        <p className=" text-sm font-extralight">Analyze and improve your JavaScript & TypeScript.</p>
      </div>
      <div className="flex gap-2">
        <Select items={items} value={action} onValueChange={(val) => setAction(val as CodeAction)} >
          <SelectTrigger className="w-45 cursor-pointer">
            <SelectValue placeholder="Select optimizer function" />
          </SelectTrigger>  
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}  >
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>  
          </SelectContent>
        </Select>
        <Button className="cursor-pointer"> <Play/> Run</Button>
      </div>
    </>
  )
}

export default Header