import Image from 'next/image'
import { ExpandUserPopover } from '@/components/expand-user-popover'
import { Button } from '@/components/ui/button'

export function UserProfileButton() {
  return (
    <ExpandUserPopover>
      <Button className="ml-8 mr-2 relative rounded-full w-[50px] h-[50px] overflow-hidden">
        <Image 
          src="/user/me.jpg" 
          alt="user profile photo" 
          className="object-cover"
          fill
          sizes="50px"
          draggable={false}
        />
      </Button>
    </ExpandUserPopover>
  )
}

