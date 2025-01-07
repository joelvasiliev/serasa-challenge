import Image from 'next/image'
import { ExpandUserPopover } from '@/components/expand-user-popover'
import { Button } from '@/components/ui/button'

export function UserProfileButton() {
  return (
    <ExpandUserPopover>
      <Button className="ml-8 mr-2 relative rounded-full w-[50px] h-[50px] shadow-none border border-black overflow-hidden">
        <Image 
          src="/user.png" 
          alt="user profile photo" 
          className="object-fit"
          fill
          sizes="50px"
          draggable={false}
        />
      </Button>
    </ExpandUserPopover>
  )
}

