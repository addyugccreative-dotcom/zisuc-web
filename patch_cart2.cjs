const fs = require('fs');
let code = fs.readFileSync('src/components/CartDrawer.tsx', 'utf-8');

// Update progress bar header text
code = code.replace(
`{!nextTier ? (
              <span className="text-emerald-700 font-bold">🎉 Congratulations! You have unlocked all rewards!</span>
            ) : (
              <span>Spend <span className="font-bold font-mono text-teal-700">{convertAndFormatPrice('$' + (nextTier.threshold - subtotal), activeCurrency)}</span> more to unlock <span className="font-bold">{nextTier.label}</span> {nextTier.icon}</span>
            )}`,
`{!nextTier ? (
              <span className="text-teal-600 font-bold text-sm">🎉 You have unlocked all rewards!</span>
            ) : (
              <span className="text-[13px] font-bold">You're {convertAndFormatPrice('$' + (nextTier.threshold - subtotal), activeCurrency)} away from {nextTier.label.toUpperCase()}!</span>
            )}`
);

// Update progress bar visuals
code = code.replace(
`<div className="relative w-full h-1 bg-neutral-200 rounded-full mt-1 mb-1">
            <div
              className="absolute top-0 left-0 h-full rounded-full transition duration-500 z-10"
              style={{
                backgroundColor: settings.colorButton,
                width: \`\${progressPercent}%\`,
              }}
            />
            {TIERS.map((tier, idx) => {
              const isUnlocked = subtotal >= tier.threshold;
              const leftPercent = getPositionPercent(idx);
              return (
                <div key={idx} className="absolute top-1/2 -translate-y-1/2 z-20 flex flex-col items-center" style={{ left: \`\${leftPercent}%\`, transform: \`translate(-50%, -50%)\` }}>
                  <div className={\`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center bg-white transition-colors duration-300 \${isUnlocked ? 'border-teal-500' : 'border-neutral-300'}\`}>
                    {isUnlocked && <Check className="w-2 h-2 text-teal-600" strokeWidth={3} />}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative w-full h-4 mt-1.5">
            {TIERS.map((tier, idx) => {
              const isUnlocked = subtotal >= tier.threshold;
              const leftPercent = getPositionPercent(idx);
              return (
                <div key={idx} className="absolute top-0 flex justify-center w-20 sm:w-22 px-1" style={{ left: \`\${leftPercent}%\`, transform: \`translateX(-50%)\` }}>
                  <span className={\`text-[8px] sm:text-[9px] leading-tight text-center transition-colors font-semibold whitespace-normal break-words \${isUnlocked ? 'text-teal-700 font-bold' : 'text-gray-400'}\`}>
                    {tier.shortLabel}
                  </span>
                </div>
              );
            })}
          </div>`,
`<div className="relative w-[90%] mx-auto h-2 bg-neutral-200 rounded-full mt-5 mb-4">
            {/* Striped progress bar effect */}
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 z-10 overflow-hidden"
              style={{
                backgroundColor: '#00c4ba',
                width: \`\${progressPercent}%\`,
              }}
            >
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)',
                backgroundSize: '1rem 1rem'
              }}></div>
            </div>
            {TIERS.map((tier, idx) => {
              const isUnlocked = subtotal >= tier.threshold;
              const leftPercent = getPositionPercent(idx);
              const Icon = tier.icon;
              return (
                <div key={idx} className="absolute top-1/2 -translate-y-1/2 z-20 flex flex-col items-center" style={{ left: \`\${leftPercent}%\`, transform: \`translate(-50%, -50%)\` }}>
                  <div className={\`w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white transition-colors duration-300 \${isUnlocked ? 'border-[#00c4ba] text-[#00c4ba]' : 'border-neutral-300 text-neutral-400'}\`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={\`absolute top-10 text-[10px] leading-tight text-center transition-colors font-medium whitespace-nowrap \${isUnlocked ? 'text-[#00c4ba]' : 'text-gray-500'}\`}>
                    {tier.shortLabel}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="h-6"></div>`
);

fs.writeFileSync('src/components/CartDrawer.tsx', code);
