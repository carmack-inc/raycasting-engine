import { AssetsContent } from '@/app/engine/assets'
import { MapContent } from '@/app/engine/map'
import { TabsContent } from '@radix-ui/react-tabs'

export default function Engine() {
  return (
    <div>
      <TabsContent value="map">
        <MapContent />
      </TabsContent>

      <TabsContent value="assets">
        <AssetsContent />
      </TabsContent>
    </div>
  )
}
