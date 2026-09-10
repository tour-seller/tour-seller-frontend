'use client';

import { useEffect, useState } from 'react';
import type { Location } from '@tour-seller/types';

interface CascadingSelectProps {
  onChange?: (selection: { cityId?: number; districtId?: number; wardId?: number; shippingFee?: number }) => void;
}

export function CascadingSelect({ onChange }: CascadingSelectProps) {
  const [cities, setCities] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);
  const [cityId, setCityId] = useState<number>(0);
  const [districtId, setDistrictId] = useState<number>(0);
  const [wardId, setWardId] = useState<number>(0);

  useEffect(() => {
    fetch('/api/places?type=city')
      .then((r) => r.json())
      .then(setCities)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (cityId) {
      fetch(`/api/places?type=district&parent=${cityId}`)
        .then((r) => r.json())
        .then(setDistricts)
        .catch(() => {});
      setDistricts([]);
      setWards([]);
      setWardId(0);
    }
  }, [cityId]);

  useEffect(() => {
    if (districtId) {
      fetch(`/api/places?type=ward&parent=${districtId}`)
        .then((r) => r.json())
        .then(setWards)
        .catch(() => {});
      setWards([]);
      setWardId(0);
    }
  }, [districtId]);

  useEffect(() => {
    onChange?.({
      cityId: cityId || undefined,
      districtId: districtId || undefined,
      wardId: wardId || undefined,
    });
  }, [cityId, districtId, wardId, onChange]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
      <div>
        <label className="text-slate-600 block mb-1 font-semibold">Tỉnh / Thành phố</label>
        <select
          value={cityId}
          onChange={(e) => setCityId(Number(e.target.value))}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-primary"
        >
          <option value={0}>Chọn Tỉnh / Thành phố</option>
          {cities.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name || c.namevi}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-slate-600 block mb-1 font-semibold">Quận / Huyện</label>
        <select
          value={districtId}
          onChange={(e) => setDistrictId(Number(e.target.value))}
          disabled={!cityId}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-primary disabled:opacity-50"
        >
          <option value={0}>Chọn Quận / Huyện</option>
          {districts.map((d: any) => (
            <option key={d.id} value={d.id}>
              {d.name || d.namevi}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-slate-600 block mb-1 font-semibold">Phường / Xã</label>
        <select
          value={wardId}
          onChange={(e) => setWardId(Number(e.target.value))}
          disabled={!districtId}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-primary disabled:opacity-50"
        >
          <option value={0}>Chọn Phường / Xã</option>
          {wards.map((w: any) => (
            <option key={w.id} value={w.id}>
              {w.name || w.namevi}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
