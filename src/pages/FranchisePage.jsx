import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Send, ChevronLeft, ChevronRight } from 'lucide-react'
import PageHero from '../components/PageHero'

const IMAGE =
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1800&q=85&auto=format&fit=crop'

const STEPS = [
  'Kişisel Bilgiler',
  'İş Bilgileri',
  'Mağaza Lokasyonu',
  'Mağaza',
  'Ek Not',
]

const INITIAL = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  education: '',
  country: '',
  city: '',
  currentJob: '',
  storeAddress: '',
  ownership: '',
  storeType: '',
  sqm: '',
  businessModel: '',
  locationSuggestion: '',
  locationPreference: '',
  budget: '',
  note: '',
  kvkk: false,
}

const inputCls =
  'w-full bg-espresso-black border border-espresso-border focus:border-espresso-red text-espresso-ivory placeholder-espresso-muted font-sans text-sm px-5 py-4 outline-none transition-colors duration-300'

const selectCls =
  'w-full bg-espresso-black border border-espresso-border focus:border-espresso-red text-espresso-ivory font-sans text-sm px-5 py-4 outline-none transition-colors duration-300 appearance-none cursor-pointer'

function Label({ children }) {
  return (
    <label className="block text-xs tracking-widest uppercase font-sans text-espresso-muted mb-2">
      {children}
    </label>
  )
}

function Radio({ name, value, label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="accent-espresso-red w-4 h-4 flex-shrink-0"
      />
      <span className="text-espresso-muted text-sm font-sans group-hover:text-espresso-ivory transition-colors duration-200">
        {label}
      </span>
    </label>
  )
}

export default function FranchisePage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(INITIAL)
  const [sent, setSent] = useState(false)
  const [direction, setDirection] = useState(1)

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }))
  const handle = (e) => set(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value)

  const goNext = () => {
    setDirection(1)
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }
  const goPrev = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.kvkk) return
    setSent(true)
  }

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -48 : 48 }),
  }

  return (
    <>
      <PageHero
        label="İş Birliği Fırsatı"
        title="Franchise Başvurusu"
        subtitle="Formu eksiksiz doldurun. Franchise ekibimiz 2 iş günü içinde sizinle iletişime geçecektir."
        image={IMAGE}
        breadcrumb="Franchise"
      />

      <section className="py-20 bg-espresso-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-espresso-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-espresso-gold/4 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="card-dark p-12 flex flex-col items-center text-center gap-6"
            >
              <div className="w-24 h-24 border-2 border-espresso-red flex items-center justify-center">
                <CheckCircle size={44} className="text-espresso-red" />
              </div>
              <h3 className="font-serif text-3xl text-espresso-ivory">Başvurunuz Alındı!</h3>
              <p className="text-espresso-muted font-sans text-sm max-w-sm leading-relaxed">
                Franchise ekibimiz en geç 2 iş günü içinde{' '}
                <span className="text-espresso-ivory">{form.email}</span> adresinize
                dönüş yapacaktır.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Step indicator */}
              <div className="mb-10">
                <div className="flex items-center justify-between gap-1 sm:gap-2">
                  {STEPS.map((label, i) => (
                    <div key={label} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className={`w-8 h-8 flex items-center justify-center text-xs font-sans font-bold transition-all duration-300 border ${
                          i < step
                            ? 'bg-espresso-red border-espresso-red text-white'
                            : i === step
                            ? 'border-espresso-red text-espresso-red'
                            : 'border-espresso-border text-espresso-muted'
                        }`}
                      >
                        {i < step ? <CheckCircle size={14} /> : i + 1}
                      </div>
                      <span className={`text-[9px] tracking-wider uppercase font-sans text-center hidden sm:block ${
                        i === step ? 'text-espresso-red' : 'text-espresso-muted'
                      }`}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-px bg-espresso-border relative">
                  <motion.div
                    className="absolute top-0 left-0 h-px bg-espresso-red"
                    animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Step panels */}
              <div className="card-dark p-8 md:p-10 overflow-hidden">
                <p className="section-label mb-1">{`Adım ${step + 1} / ${STEPS.length}`}</p>
                <h2 className="font-serif text-2xl text-espresso-ivory mb-8">{STEPS[step]}</h2>

                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="space-y-6"
                  >
                    {/* STEP 0 – Personal */}
                    {step === 0 && (
                      <>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <Label>İsim</Label>
                            <input name="firstName" value={form.firstName} onChange={handle} placeholder="Adınız" className={inputCls} />
                          </div>
                          <div>
                            <Label>Soy İsim</Label>
                            <input name="lastName" value={form.lastName} onChange={handle} placeholder="Soyadınız" className={inputCls} />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <Label>E-posta</Label>
                            <input type="email" name="email" value={form.email} onChange={handle} placeholder="ornek@eposta.com" className={inputCls} />
                          </div>
                          <div>
                            <Label>Telefon</Label>
                            <input name="phone" value={form.phone} onChange={handle} placeholder="+90 5XX XXX XX XX" className={inputCls} />
                          </div>
                        </div>
                        <div>
                          <Label>Eğitim Durumu</Label>
                          <select name="education" value={form.education} onChange={handle} className={selectCls}>
                            <option value="">Seçin</option>
                            <option>İlköğretim</option>
                            <option>Lise</option>
                            <option>Ön Lisans</option>
                            <option>Lisans</option>
                            <option>Yüksek Lisans / Doktora</option>
                          </select>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <Label>Ülke</Label>
                            <input name="country" value={form.country} onChange={handle} placeholder="Türkiye" className={inputCls} />
                          </div>
                          <div>
                            <Label>Şehir</Label>
                            <input name="city" value={form.city} onChange={handle} placeholder="İstanbul" className={inputCls} />
                          </div>
                        </div>
                      </>
                    )}

                    {/* STEP 1 – Business */}
                    {step === 1 && (
                      <div>
                        <Label>Yapılmakta Olunan İş</Label>
                        <textarea
                          name="currentJob"
                          value={form.currentJob}
                          onChange={handle}
                          rows={7}
                          placeholder="Şu anda ne iş yaptığınızı ve varsa sektör deneyiminizi kısaca anlatın..."
                          className={`${inputCls} resize-none`}
                        />
                      </div>
                    )}

                    {/* STEP 2 – Location */}
                    {step === 2 && (
                      <div>
                        <Label>Mağaza Adresi</Label>
                        <textarea
                          name="storeAddress"
                          value={form.storeAddress}
                          onChange={handle}
                          rows={6}
                          placeholder="Mağaza açmayı düşündüğünüz adres veya bölge bilgisini girin..."
                          className={`${inputCls} resize-none`}
                        />
                      </div>
                    )}

                    {/* STEP 3 – Store details */}
                    {step === 3 && (
                      <>
                        {/* Ownership */}
                        <div>
                          <Label>Mülkiyet</Label>
                          <div className="flex gap-8 mt-2">
                            <Radio name="ownership" value="Kiralık" label="Kiralık" checked={form.ownership === 'Kiralık'} onChange={handle} />
                            <Radio name="ownership" value="Mülk Sahibi" label="Mülk Sahibi" checked={form.ownership === 'Mülk Sahibi'} onChange={handle} />
                          </div>
                        </div>

                        {/* Type */}
                        <div>
                          <Label>Tipi</Label>
                          <div className="flex gap-8 mt-2">
                            <Radio name="storeType" value="Bahçeli" label="Bahçeli" checked={form.storeType === 'Bahçeli'} onChange={handle} />
                            <Radio name="storeType" value="Bahçesiz" label="Bahçesiz" checked={form.storeType === 'Bahçesiz'} onChange={handle} />
                          </div>
                        </div>

                        {/* sqm */}
                        <div>
                          <Label>Metrekare</Label>
                          <input name="sqm" value={form.sqm} onChange={handle} placeholder="Örn. 80 m²" className={inputCls} />
                        </div>

                        {/* Business model */}
                        <div>
                          <Label>İşletme Modeliniz Nedir?</Label>
                          <div className="flex flex-col gap-3 mt-2">
                            <Radio
                              name="businessModel"
                              value="Kendim işleteceğim"
                              label="Kendim işleteceğim"
                              checked={form.businessModel === 'Kendim işleteceğim'}
                              onChange={handle}
                            />
                            <Radio
                              name="businessModel"
                              value="Geri planda yatırımcı olacağım"
                              label="Geri planda yatırımcı olacağım"
                              checked={form.businessModel === 'Geri planda yatırımcı olacağım'}
                              onChange={handle}
                            />
                          </div>
                        </div>

                        {/* Location suggestion */}
                        <div>
                          <Label>Yer Önerilmesini İster Misiniz?</Label>
                          <div className="flex gap-8 mt-2">
                            <Radio name="locationSuggestion" value="Evet" label="Evet" checked={form.locationSuggestion === 'Evet'} onChange={handle} />
                            <Radio name="locationSuggestion" value="Hayır" label="Hayır" checked={form.locationSuggestion === 'Hayır'} onChange={handle} />
                          </div>
                          {form.locationSuggestion === 'Evet' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} className="mt-4">
                              <Label>Devir mi Sıfır Dükkan mı Tercih Edersiniz?</Label>
                              <div className="flex gap-8 mt-2">
                                <Radio name="locationPreference" value="Devir" label="Devir" checked={form.locationPreference === 'Devir'} onChange={handle} />
                                <Radio name="locationPreference" value="Sıfır Dükkan" label="Sıfır Dükkan" checked={form.locationPreference === 'Sıfır Dükkan'} onChange={handle} />
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Budget */}
                        <div>
                          <Label>Yatırım İçin Ayırdığınız Bütçe Ne Kadar?</Label>
                          <input name="budget" value={form.budget} onChange={handle} placeholder="Örn. 600.000 ₺" className={inputCls} />
                        </div>
                      </>
                    )}

                    {/* STEP 4 – Extra note + KVKK */}
                    {step === 4 && (
                      <>
                        <div>
                          <Label>Ek Not</Label>
                          <textarea
                            name="note"
                            value={form.note}
                            onChange={handle}
                            rows={7}
                            placeholder="Eklemek istediğiniz herhangi bir not veya sorunuz varsa buraya yazabilirsiniz..."
                            className={`${inputCls} resize-none`}
                          />
                        </div>

                        {/* KVKK */}
                        <div className="flex items-start gap-3 pt-2">
                          <input
                            type="checkbox"
                            id="kvkk"
                            name="kvkk"
                            checked={form.kvkk}
                            onChange={handle}
                            className="mt-1 accent-espresso-red w-4 h-4 flex-shrink-0 cursor-pointer"
                          />
                          <label htmlFor="kvkk" className="text-espresso-muted text-xs font-sans leading-relaxed cursor-pointer">
                            Kişisel verilerimin Esprezzo tarafından franchise başvuru sürecinin değerlendirilmesi amacıyla KVKK kapsamında işlenmesine onay veriyorum.{' '}
                            <span className="text-espresso-red underline underline-offset-2 cursor-pointer">KVKK Bildirimini Okudum ve Onayladım.</span>
                          </label>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between gap-4 mt-6">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={step === 0}
                  className={`flex items-center gap-2 px-6 py-4 border font-sans text-xs tracking-widest uppercase font-medium transition-all duration-300 ${
                    step === 0
                      ? 'border-espresso-border text-espresso-muted opacity-40 cursor-not-allowed'
                      : 'border-espresso-border text-espresso-ivory hover:border-espresso-red hover:text-espresso-red'
                  }`}
                >
                  <ChevronLeft size={16} /> Geri
                </button>

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex items-center gap-2 btn-primary"
                  >
                    İleri <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!form.kvkk}
                    className={`flex items-center gap-2 btn-primary ${!form.kvkk ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Send size={16} /> Başvuruyu Gönder
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
