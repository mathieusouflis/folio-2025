'use client'

import { Grid, GridItem, GridMargin } from '@/components/layout/Grid'
import { GridOverlayToggle } from '@/components/ui/grid-overlay-toggle'

export default function GridDemoPage() {
  return (
    <div className="py-20 space-y-32">
      {/* Header */}
      <GridMargin>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-4">Grid System Demo</h1>
            <p className="text-xl text-muted">
              Pixel-perfect layouts with our 12-column grid system
            </p>
          </div>
          <GridOverlayToggle />
        </div>
      </GridMargin>

      {/* Example 1: Basic Two Column */}
      <section>
        <GridMargin className="mb-8">
          <h2 className="text-3xl font-bold mb-2">1. Basic Two Column Layout</h2>
          <p className="text-muted">Each column spans exactly 6 of 12 columns</p>
        </GridMargin>

        <Grid>
          <GridItem span={6}>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">6 Columns</div>
                <div className="text-sm text-muted">Left Half</div>
              </div>
            </div>
          </GridItem>

          <GridItem span={6}>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">6 Columns</div>
                <div className="text-sm text-muted">Right Half</div>
              </div>
            </div>
          </GridItem>
        </Grid>
      </section>

      {/* Example 2: Asymmetric Layout */}
      <section>
        <GridMargin className="mb-8">
          <h2 className="text-3xl font-bold mb-2">2. Asymmetric Layout</h2>
          <p className="text-muted">8 columns for main content, 4 for sidebar</p>
        </GridMargin>

        <Grid>
          <GridItem span={8}>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-8 min-h-96">
              <h3 className="text-2xl font-bold mb-4">Main Content (8 columns)</h3>
              <p className="text-muted mb-4">
                This area takes up 8 of 12 columns, giving it more prominence. Perfect for articles,
                blog posts, or main content areas.
              </p>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-blue-500/5 rounded" />
                ))}
              </div>
            </div>
          </GridItem>

          <GridItem span={4}>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 min-h-96">
              <h3 className="text-xl font-bold mb-4">Sidebar (4 columns)</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-green-500/10 rounded" />
                ))}
              </div>
            </div>
          </GridItem>
        </Grid>
      </section>

      {/* Example 3: Card Grid */}
      <section>
        <GridMargin className="mb-8">
          <h2 className="text-3xl font-bold mb-2">3. Card Grid</h2>
          <p className="text-muted">Four equal cards, each spanning 3 columns</p>
        </GridMargin>

        <Grid>
          {[1, 2, 3, 4].map((card) => (
            <GridItem key={card} span={3}>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6 h-48 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold mb-2">Card {card}</div>
                <div className="text-sm text-muted">3 columns wide</div>
              </div>
            </GridItem>
          ))}
        </Grid>
      </section>

      {/* Example 4: Centered Content */}
      <section>
        <GridMargin className="mb-8">
          <h2 className="text-3xl font-bold mb-2">4. Centered Content</h2>
          <p className="text-muted">8 columns centered with 2 column margins on each side</p>
        </GridMargin>

        <Grid>
          <GridItem start={3} span={8}>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Perfectly Centered</h3>
              <p className="text-muted mb-6">
                This content starts at column 3 and spans 8 columns, leaving 2 columns of space on
                each side for perfect centering.
              </p>
              <div className="inline-block px-6 py-3 bg-orange-500/20 rounded-lg font-semibold">
                Start: Col 3 | Span: 8 cols
              </div>
            </div>
          </GridItem>
        </Grid>
      </section>

      {/* Example 5: Complex Layout */}
      <section>
        <GridMargin className="mb-8">
          <h2 className="text-3xl font-bold mb-2">5. Complex Multi-Row Layout</h2>
          <p className="text-muted">Different column spans in the same grid</p>
        </GridMargin>

        <Grid className="gap-y-4">
          {/* Full width header */}
          <GridItem span={12}>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
              <div className="font-bold">Full Width Header (12 columns)</div>
            </div>
          </GridItem>

          {/* Three equal columns */}
          <GridItem span={4}>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 h-32 flex items-center justify-center">
              4 columns
            </div>
          </GridItem>
          <GridItem span={4}>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 h-32 flex items-center justify-center">
              4 columns
            </div>
          </GridItem>
          <GridItem span={4}>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 h-32 flex items-center justify-center">
              4 columns
            </div>
          </GridItem>

          {/* Two unequal columns */}
          <GridItem span={7}>
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-6 h-32 flex items-center justify-center">
              7 columns
            </div>
          </GridItem>
          <GridItem span={5}>
            <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-6 h-32 flex items-center justify-center">
              5 columns
            </div>
          </GridItem>
        </Grid>
      </section>

      {/* Example 6: Precise Positioning */}
      <section>
        <GridMargin className="mb-8">
          <h2 className="text-3xl font-bold mb-2">6. Precise Column Control</h2>
          <p className="text-muted">Using start and end properties for exact positioning</p>
        </GridMargin>

        <Grid className="gap-y-4">
          <GridItem start={1} end={4}>
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-6 h-24 flex items-center justify-center">
              Columns 1-3
            </div>
          </GridItem>

          <GridItem start={5} end={9}>
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-6 h-24 flex items-center justify-center">
              Columns 5-8 (gap before)
            </div>
          </GridItem>

          <GridItem start={10} end={13}>
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-6 h-24 flex items-center justify-center">
              Columns 10-12
            </div>
          </GridItem>
        </Grid>
      </section>

      {/* Example 7: Width Utilities */}
      <section>
        <GridMargin className="mb-8">
          <h2 className="text-3xl font-bold mb-2">7. Pixel-Perfect Width Utilities</h2>
          <p className="text-muted">Use w-grid-* classes for exact column widths</p>
        </GridMargin>

        <GridMargin>
          <div className="space-y-4">
            <div className="w-grid-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
              <code className="text-sm">w-grid-4</code> - Exactly 4 columns wide
            </div>
            <div className="w-grid-6 bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
              <code className="text-sm">w-grid-6</code> - Exactly 6 columns wide
            </div>
            <div className="w-grid-8 bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
              <code className="text-sm">w-grid-8</code> - Exactly 8 columns wide
            </div>
          </div>
        </GridMargin>
      </section>

      {/* Example 8: Nested Grids */}
      <section>
        <GridMargin className="mb-8">
          <h2 className="text-3xl font-bold mb-2">8. Nested Grids</h2>
          <p className="text-muted">Grids within grids (remember: withMargins=false for nested)</p>
        </GridMargin>

        <Grid>
          <GridItem span={8}>
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-6">
              <h3 className="font-bold mb-4">Outer Grid Item (8 columns)</h3>

              {/* Nested grid without margins */}
              <Grid withMargins={false} className="gap-y-3">
                <GridItem span={6}>
                  <div className="bg-violet-500/20 rounded p-4 text-sm">Inner 6 cols</div>
                </GridItem>
                <GridItem span={6}>
                  <div className="bg-violet-500/20 rounded p-4 text-sm">Inner 6 cols</div>
                </GridItem>
                <GridItem span={12}>
                  <div className="bg-violet-500/20 rounded p-4 text-sm">Inner 12 cols</div>
                </GridItem>
              </Grid>
            </div>
          </GridItem>

          <GridItem span={4}>
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-6 h-full flex items-center justify-center">
              <div className="text-center text-sm">
                <div className="font-bold mb-2">Regular Item</div>
                <div className="text-muted">4 columns</div>
              </div>
            </div>
          </GridItem>
        </Grid>
      </section>

      {/* Tips Section */}
      <section>
        <GridMargin>
          <div className="bg-accent/5 border border-accent/10 rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-6">💡 Pro Tips</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">1. Enable Grid Overlay</h3>
                <p className="text-muted">
                  Click the grid toggle button to see the visual overlay and ensure your content
                  aligns perfectly.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">2. No More Percentages</h3>
                <p className="text-muted">
                  Never use width: 50% again! Use GridItem span={'{6}'} instead. It accounts for
                  gaps automatically.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">3. Responsive by Default</h3>
                <p className="text-muted">
                  The grid automatically adjusts margins and gaps on mobile (24px), tablet (60px),
                  and desktop (120px).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">4. Debug Mode</h3>
                <p className="text-muted">
                  Add debug prop to Grid component: &lt;Grid debug&gt; to see a visual overlay.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">5. Read the Docs</h3>
                <p className="text-muted">
                  Check out{' '}
                  <code className="px-2 py-1 bg-accent/10 rounded">
                    src/components/layout/Grid/README.md
                  </code>{' '}
                  for comprehensive documentation.
                </p>
              </div>
            </div>
          </div>
        </GridMargin>
      </section>

      {/* Example 9: Responsive Layouts */}
      <section>
        <GridMargin className="mb-8">
          <h2 className="text-3xl font-bold mb-2">9. Responsive Layouts (Mobile → Desktop)</h2>
          <p className="text-muted">Resize your browser to see how layouts adapt automatically</p>
        </GridMargin>

        {/* Stack to Side-by-Side */}
        <GridMargin className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Stack on Mobile, Side-by-Side on Tablet+</h3>
        </GridMargin>

        <Grid className="gap-y-4">
          <GridItem span={12} className="md:grid-span-6">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 h-48 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold mb-2">Column 1</div>
              <div className="text-sm text-muted text-center">
                <div className="md:hidden">Mobile: Full width (12 cols)</div>
                <div className="hidden md:block">Desktop: Half width (6 cols)</div>
              </div>
            </div>
          </GridItem>

          <GridItem span={12} className="md:grid-span-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 h-48 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold mb-2">Column 2</div>
              <div className="text-sm text-muted text-center">
                <div className="md:hidden">Mobile: Full width (12 cols)</div>
                <div className="hidden md:block">Desktop: Half width (6 cols)</div>
              </div>
            </div>
          </GridItem>
        </Grid>

        {/* Product Grid Pattern */}
        <GridMargin className="mb-12 mt-16">
          <h3 className="text-xl font-semibold mb-4">Product Grid: 1 → 2 → 3 → 4 Columns</h3>
          <p className="text-sm text-muted">
            Mobile: 1 col | Small: 2 cols | Medium: 3 cols | Large: 4 cols
          </p>
        </GridMargin>

        <Grid className="gap-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((card) => (
            <GridItem key={card} span={12} className="sm:grid-span-6 md:grid-span-4 lg:grid-span-3">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 h-32 flex flex-col items-center justify-center">
                <div className="text-xl font-bold mb-2">Card {card}</div>
                <div className="text-xs text-muted text-center">
                  <div className="sm:hidden">Mobile: 12 cols</div>
                  <div className="hidden sm:block md:hidden">Small: 6 cols</div>
                  <div className="hidden md:block lg:hidden">Medium: 4 cols</div>
                  <div className="hidden lg:block">Large: 3 cols</div>
                </div>
              </div>
            </GridItem>
          ))}
        </Grid>

        {/* Sidebar Layout */}
        <GridMargin className="mb-12 mt-16">
          <h3 className="text-xl font-semibold mb-4">Content + Sidebar (Stacks on Mobile)</h3>
        </GridMargin>

        <Grid className="gap-y-4">
          <GridItem span={12} className="lg:grid-span-8">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6 min-h-64">
              <h4 className="text-lg font-bold mb-3">Main Content</h4>
              <p className="text-muted mb-4">
                <span className="lg:hidden">Mobile: Full width, appears first</span>
                <span className="hidden lg:inline">Desktop: 8 columns on the left</span>
              </p>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-orange-500/10 rounded" />
                ))}
              </div>
            </div>
          </GridItem>

          <GridItem span={12} className="lg:grid-span-4">
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-6 min-h-64">
              <h4 className="text-lg font-bold mb-3">Sidebar</h4>
              <p className="text-muted mb-4">
                <span className="lg:hidden">Mobile: Full width, appears second</span>
                <span className="hidden lg:inline">Desktop: 4 columns on the right</span>
              </p>
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <div key={i} className="h-12 bg-teal-500/10 rounded" />
                ))}
              </div>
            </div>
          </GridItem>
        </Grid>

        {/* Centered Content */}
        <GridMargin className="mb-12 mt-16">
          <h3 className="text-xl font-semibold mb-4">Responsive Centering</h3>
        </GridMargin>

        <Grid>
          <GridItem span={12} className="lg:grid-span-8 lg:grid-col-start-3">
            <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-8 text-center">
              <h4 className="text-2xl font-bold mb-4">Centered Content</h4>
              <p className="text-muted">
                <span className="lg:hidden">Mobile: Full width (12 cols)</span>
                <span className="hidden lg:inline">Desktop: 8 cols centered (starts at col 3)</span>
              </p>
            </div>
          </GridItem>
        </Grid>
      </section>

      {/* Responsive Code Examples */}
      <section>
        <GridMargin className="mb-8">
          <h2 className="text-3xl font-bold mb-2">10. How to Write Responsive Code</h2>
          <p className="text-muted">Copy these patterns for your layouts</p>
        </GridMargin>

        <GridMargin>
          <div className="space-y-8">
            {/* Example 1 */}
            <div className="bg-accent/5 border border-accent/10 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Stack on Mobile, Side-by-Side on Desktop</h3>
              <pre className="bg-black/5 rounded p-4 overflow-x-auto text-sm">
                <code>{`<Grid>
  <GridItem span={12} className="md:grid-span-6">
    Left Column
  </GridItem>
  <GridItem span={12} className="md:grid-span-6">
    Right Column
  </GridItem>
</Grid>`}</code>
              </pre>
            </div>

            {/* Example 2 */}
            <div className="bg-accent/5 border border-accent/10 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Product Grid (1→2→3→4 columns)</h3>
              <pre className="bg-black/5 rounded p-4 overflow-x-auto text-sm">
                <code>{`<Grid>
  {products.map(product => (
    <GridItem
      key={product.id}
      span={12}
      className="sm:grid-span-6 md:grid-span-4 lg:grid-span-3"
    >
      <ProductCard {...product} />
    </GridItem>
  ))}
</Grid>`}</code>
              </pre>
            </div>

            {/* Example 3 */}
            <div className="bg-accent/5 border border-accent/10 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Content + Sidebar (Responsive)</h3>
              <pre className="bg-black/5 rounded p-4 overflow-x-auto text-sm">
                <code>{`<Grid>
  <GridItem span={12} className="lg:grid-span-8">
    Main Content
  </GridItem>
  <GridItem span={12} className="lg:grid-span-4">
    Sidebar
  </GridItem>
</Grid>`}</code>
              </pre>
            </div>
          </div>
        </GridMargin>
      </section>

      {/* Tips Section */}
      <section>
        <GridMargin>
          <div className="bg-accent/5 border border-accent/10 rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-6">💡 Pro Tips</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">1. Enable Grid Overlay</h3>
                <p className="text-muted">
                  Click the grid toggle button to see the visual overlay and ensure your content
                  aligns perfectly.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">2. No More Percentages</h3>
                <p className="text-muted">
                  Never use width: 50% again! Use GridItem span={'{6}'} instead. It accounts for
                  gaps automatically.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">3. Responsive by Default</h3>
                <p className="text-muted">
                  The grid automatically adjusts margins and gaps on mobile (24px), tablet (60px),
                  and desktop (120px).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">4. Use Tailwind Breakpoints</h3>
                <p className="text-muted">
                  Combine grid system with Tailwind: className=&quot;md:grid-span-6
                  lg:grid-span-4&quot;
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">5. Read the Docs</h3>
                <p className="text-muted">
                  Check out{' '}
                  <code className="px-2 py-1 bg-accent/10 rounded">RESPONSIVE_GRID_GUIDE.md</code>{' '}
                  for comprehensive responsive examples.
                </p>
              </div>
            </div>
          </div>
        </GridMargin>
      </section>

      {/* Example 11: Custom Column Counts */}
      <section>
        <GridMargin className="mb-8">
          <h2 className="text-3xl font-bold mb-2">11. Custom Column Counts (Not Just 12!)</h2>
          <p className="text-muted">Use 4, 10, 40, or ANY number of columns</p>
        </GridMargin>

        {/* 4 Columns */}
        <GridMargin className="mb-12">
          <h3 className="text-xl font-semibold mb-4">4 Columns (Mobile-Friendly)</h3>
        </GridMargin>

        <Grid columns={4} className="gap-y-4">
          <GridItem span={2}>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="font-bold">2 of 4 columns</div>
                <div className="text-sm text-muted">50% width</div>
              </div>
            </div>
          </GridItem>
          <GridItem span={2}>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="font-bold">2 of 4 columns</div>
                <div className="text-sm text-muted">50% width</div>
              </div>
            </div>
          </GridItem>
          <GridItem span={1}>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 h-24 flex items-center justify-center text-sm">
              1/4
            </div>
          </GridItem>
          <GridItem span={1}>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 h-24 flex items-center justify-center text-sm">
              1/4
            </div>
          </GridItem>
          <GridItem span={1}>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 h-24 flex items-center justify-center text-sm">
              1/4
            </div>
          </GridItem>
          <GridItem span={1}>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 h-24 flex items-center justify-center text-sm">
              1/4
            </div>
          </GridItem>
        </Grid>

        {/* 10 Columns */}
        <GridMargin className="mb-12 mt-16">
          <h3 className="text-xl font-semibold mb-4">10 Columns (Design Systems)</h3>
        </GridMargin>

        <Grid columns={10} className="gap-y-4">
          <GridItem span={7}>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6 h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="font-bold">7 of 10 columns</div>
                <div className="text-sm text-muted">70% width</div>
              </div>
            </div>
          </GridItem>
          <GridItem span={3}>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6 h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="font-bold">3 of 10</div>
                <div className="text-sm text-muted">30%</div>
              </div>
            </div>
          </GridItem>
        </Grid>

        {/* 40 Columns */}
        <GridMargin className="mb-12 mt-16">
          <h3 className="text-xl font-semibold mb-4">40 Columns (Ultra-Precise Control!)</h3>
        </GridMargin>

        <Grid columns={40} className="gap-y-4">
          <GridItem span={10}>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="font-bold">10 of 40</div>
                <div className="text-sm text-muted">25% width</div>
              </div>
            </div>
          </GridItem>
          <GridItem span={20}>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="font-bold">20 of 40 columns</div>
                <div className="text-sm text-muted">50% width</div>
              </div>
            </div>
          </GridItem>
          <GridItem span={10}>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="font-bold">10 of 40</div>
                <div className="text-sm text-muted">25% width</div>
              </div>
            </div>
          </GridItem>

          {/* Show ultra-precise control */}
          <GridItem span={13}>
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 h-24 flex items-center justify-center text-sm">
              13/40 = 32.5%
            </div>
          </GridItem>
          <GridItem span={27}>
            <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 h-24 flex items-center justify-center text-sm">
              27/40 = 67.5%
            </div>
          </GridItem>
        </Grid>

        {/* Code Example */}
        <GridMargin className="mt-16">
          <div className="bg-accent/5 border border-accent/10 rounded-lg p-6">
            <h3 className="font-semibold mb-3">How to Use Custom Columns</h3>
            <pre className="bg-black/5 rounded p-4 overflow-x-auto text-sm">
              <code>{`// 4 columns
<Grid columns={4}>
  <GridItem span={2}>Half width</GridItem>
</Grid>

// 10 columns
<Grid columns={10}>
  <GridItem span={7}>70% width</GridItem>
  <GridItem span={3}>30% width</GridItem>
</Grid>

// 40 columns (ultra-precise!)
<Grid columns={40}>
  <GridItem span={13}>32.5% width</GridItem>
  <GridItem span={27}>67.5% width</GridItem>
</Grid>

// ANY number works!
<Grid columns={100}>
  <GridItem span={37}>37% width</GridItem>
</Grid>`}</code>
            </pre>
          </div>
        </GridMargin>
      </section>

      {/* Final Tips */}
      <section>
        <GridMargin>
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-6">🎉 You're a Grid Master Now!</h2>

            <div className="space-y-4">
              <p className="text-lg">
                You now know how to build pixel-perfect, responsive layouts with the grid system:
              </p>

              <ul className="space-y-2 text-muted">
                <li>✅ Use Grid and GridItem components</li>
                <li>✅ Combine with Tailwind responsive classes</li>
                <li>✅ Choose ANY column count (4, 10, 12, 40, 100...)</li>
                <li>✅ Toggle grid overlay for alignment</li>
                <li>✅ No more percentages or hardcoded values</li>
              </ul>

              <div className="mt-8 p-6 bg-background rounded-lg border border-border">
                <h3 className="font-semibold mb-3">📚 Next Steps:</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    📖 Read{' '}
                    <code className="px-2 py-1 bg-accent/10 rounded">CUSTOM_COLUMNS_GUIDE.md</code>{' '}
                    for custom column patterns
                  </li>
                  <li>
                    📖 Read{' '}
                    <code className="px-2 py-1 bg-accent/10 rounded">RESPONSIVE_GRID_GUIDE.md</code>{' '}
                    for responsive examples
                  </li>
                  <li>
                    📖 Read{' '}
                    <code className="px-2 py-1 bg-accent/10 rounded">GRID_CHEATSHEET.md</code> for
                    quick reference
                  </li>
                  <li>🎨 Start replacing your old layouts with Grid components</li>
                  <li>🔍 Use Ctrl/⌘ + Shift + G to toggle grid overlay anytime</li>
                </ul>
              </div>
            </div>
          </div>
        </GridMargin>
      </section>

      {/* Footer */}
      <GridMargin className="text-center text-muted border-t border-border pt-12">
        <p className="text-lg font-semibold">
          Scroll up and toggle the grid overlay to see how everything aligns perfectly! 🎯
        </p>
        <p className="mt-2">Resize your browser to see responsive layouts in action! 📱💻🖥️</p>
        <p className="mt-4 text-sm">
          Try using 4, 10, 40, or even 100 columns - the system handles it all!
        </p>
      </GridMargin>
    </div>
  )
}
